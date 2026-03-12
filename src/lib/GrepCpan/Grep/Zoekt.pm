package GrepCpan::Grep::Zoekt;

use v5.036;

sub build_query(%opts) {

    my $search          = $opts{search} // '';
    my $flavor          = $opts{flavor} // '-F';
    my $caseinsensitive = $opts{caseinsensitive};
    my $search_distro   = $opts{search_distro};
    my $filetypes       = $opts{filetypes};       # arrayref
    my $ignore_files    = $opts{ignore_files};     # arrayref

    my @parts;

    # search term -- regex or literal
    if ( $flavor eq '-P' ) {
        push @parts, "regex:$search";
    }
    else {
        push @parts, $search;
    }

    # case sensitivity
    push @parts, 'case:no' if $caseinsensitive;

    # distro filter
    if ( defined $search_distro && length $search_distro ) {
        push @parts, "file:distros/.*/$search_distro/";
    }

    # filetype includes
    if ( $filetypes && @$filetypes ) {
        if ( @$filetypes == 1 ) {
            my $ext = _glob_to_regex( $filetypes->[0] );
            push @parts, "file:$ext\$";
        }
        else {
            my $group = join ' or ',
                map { 'file:' . _glob_to_regex($_) . '$' } @$filetypes;
            push @parts, "($group)";
        }
    }

    # file exclusions
    if ( $ignore_files && @$ignore_files ) {
        for my $pattern (@$ignore_files) {
            my $ext = _glob_to_regex($pattern);
            push @parts, "-file:$ext\$";
        }
    }

    return join ' ', @parts;
}

sub _glob_to_regex($glob) {

    # convert simple globs like *.pm to regex like \.pm
    # strip leading * since we use $ anchor
    $glob =~ s{^\*}{};
    # escape dots for regex
    $glob =~ s{\.}{\\.}g;

    return $glob;
}

1;
