#!/usr/bin/env perl

use strict;
use warnings;

use FindBin;
use Git::Repository ();
use Test::More;

run() unless caller();

sub run {

    my $root = $FindBin::Bin . q{/..};

    my $git = Git::Repository->new( work_tree => $root );

    my @out = $git->run( 'grep', q{/_assets/}, 'views', 'public/*.html' );
    #note explain \@out;

    my %assets;

    foreach my $line (@out) {
        my ( $file, $line ) = split( q{:}, $line, 2 );
        if ( $line =~ qr{/_assets/([a-zA-Z0-9-]+\.(css|js))} ) {
            my $asset = $1;
            if ( !exists $assets{$asset} ) {
                $assets{$asset} = -e qq{$root/public/_assets/$asset} ? {} : 0;
            }
            next if !$assets{$asset};
            $assets{$asset}->{$file} = 1;    # only tag the file once
        }
    }

    chdir($root) or die;

    my $ts = qx{date "+%Y%m%d%H%M%S"};
    chomp $ts;

    die unless $ts;
    my $ok;

    foreach my $asset ( sort keys %assets ) {
        next unless ref $assets{$asset};
        my ( $prefix, $base ) = split( '-', $asset, 2 );
        $base = $prefix if !defined $base;
        my $new            = qq{/_assets/$ts-$base};
        my $new_asset_file = qq{$root/public/$new};
        my $old_asset = "$root/public/_assets/$asset";
        system( 'cp', $old_asset, $new_asset_file ) == 0
          or die;

        my $cmd = qq{sed -i -e "s|/_assets/$asset|$new|g" }
          . join( ' ', sort keys %{ $assets{$asset} } );
        qx{$cmd};
        warn "Error: $cmd - $!" if $? != 0;

        $git->run( 'add', $new_asset_file, sort keys %{ $assets{$asset} } );
        $git->run( 'rm', $old_asset );

        foreach my $f ( sort keys %{ $assets{$asset} } ) {
            my $_e = $f . q{-e};
            unlink $_e if -e $_e;
        }
        $ok = 1;
    }

    if ($ok) {
        $git->run( 'commit', '-m', "Bump assets to $ts" )
          or die "Error while committing";
        note qq{Assets updated to: $ts};
        note scalar $git->run( 'show', '--stat', '-n1' );
    }
    else {
        note q{Nothing to do};
    }

}

