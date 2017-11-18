#!/usr/bin/env perl

use strict;
use warnings;

# Hack to use carton's local::lib.
use lib 'local/lib/perl5';

use Test::More;

exit( run() // 0 ) unless caller;

sub run {

    note "1 - Trimming spaces";
    trim_spaces();
    note "done";
    note "";

    note "2 - tidy code";
    tidyall_do();
    note "done";
    note "";

    note "3 - tidy/perlcritic check";
    tidyall_check();
    note "done";

}

# rules
sub trim_spaces {
    my $files = list_txt_files();

    my $mksum;
    foreach (qw{ md5sum shasum }) {
        $mksum = qx{which $_ 2>/dev/null};
        if ( $? == 0 ) {
            chomp $mksum if $mksum;
            last;
        }
    }

    do { note "skipping trim spaces... no mksum"; return }
        unless $mksum && -x $mksum;

    foreach my $file (@$files) {
        my $md5a = qx[$mksum $file];
        qx[$^X -pi -e 's{ +\$}{}' $file];
        my $md5b = qx[$mksum $file];
        if ( $md5a ne $md5b ) {
            note "Removed trailing spaces from '$file'";
            qx{git update-index --add $file};
        }
    }
}

sub tidyall_do {
    my $tidyall = qx{which tidyall};
    if ( $? != 0 && !$tidyall && !-x $tidyall ) {
        warn "Missing tidyall binary... skipping tidyall_do";
    }

    my $files = list_perl_files();
    push @$files, '.gitignore';    # need to sort it
    foreach my $file (@$files) {
        my $out = qx{tidyall $file};
        note $out;
        if ( $out && $out =~ qr{tidied} ) {
            qx{git update-index --add $file};
        }
    }

}

sub tidyall_check {                # this is only a check

    eval q{use Code::TidyAll::Git::Precommit; 1 } or do {
        warn
            "Missing module Code::TidyAll::Git::Precommit - cannot run tidyall_check\n";
        return 1;
    };

    note "starting Git::Precommit";
    Code::TidyAll::Git::Precommit->check();

    return;
}

# helper
sub list_perl_files {
    return list_txt_files('perl');
}

sub list_txt_files {
    my ($filter) = @_;

    my @list;

    my @files = qx[ git diff --cached --name-status];
    chomp @files;
    my $ok;
    foreach my $file ( sort @files ) {
        next unless $file =~ s{^[AM]\s+}{};

        $ok = 0;
        if ( $file =~ qr{\.( t | pm | pl | psgi )$}xi ) {
            $ok = 1;
            next;
        }
        next if $filter && $filter eq 'perl';    # only perl files for perl
        my $type = qx{file $file};
        next if $? != 0;
        $ok = 1 if $type =~ qr{text};
    }
    continue {
        push @list, $file if $ok;
    }

    #note explain \@list;

    return \@list;
}
