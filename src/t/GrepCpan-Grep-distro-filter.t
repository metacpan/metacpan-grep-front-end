use strict;
use warnings;

use Test2::Bundle::Extended;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

# Test the distro filter sanitization and validation logic
# extracted from GrepCpan::Grep::_get_match_cache

# This mirrors the distro validation logic in _get_match_cache
sub _normalize_distro {
    my ($search_distro) = @_;

    return undef unless defined $search_distro && length($search_distro);

    $search_distro =~ s{::+}{-}g;
    $search_distro =~ s{^\^}{};

    return undef unless length($search_distro);

    if ( $search_distro =~ qr{^([0-9a-zA-Z_\*\.])[0-9a-zA-Z_\*\.\-]*$} ) {
        return $search_distro;
    }

    return undef;    # invalid pattern
}

# Valid distro patterns
my @valid = (
    [ 'Mojo'      => 'Mojo',     'simple distro name' ],
    [ 'Mojo*'     => 'Mojo*',    'distro with trailing glob' ],
    [ 'Mojo.*'    => 'Mojo.*',   'distro with dot-star glob' ],
    [ '^Mojo.*'   => 'Mojo.*',   'distro with leading caret stripped' ],
    [ '^App-*'    => 'App-*',    'caret + distro with dash and glob' ],
    [ 'App-Foo'   => 'App-Foo',  'distro with dash' ],
    [ 'Try-Tiny'  => 'Try-Tiny', 'typical distro name' ],
    [ 'Mojo::Foo' => 'Mojo-Foo', 'double-colon converted to dash' ],
    [ '*.pm'      => '*.pm',     'glob starting with star' ],
);

for my $t (@valid) {
    my ( $input, $expected, $desc ) = @$t;
    is _normalize_distro($input), $expected, "valid: $desc ($input => $expected)";
}

# Invalid distro patterns (should return undef)
my @invalid = (
    [ undef,      'undef input' ],
    [ '',         'empty string' ],
    [ '^',        'only a caret' ],
    [ '-Foo',     'leading dash' ],
    [ 'Foo;Bar',  'semicolon not allowed' ],
    [ 'Foo/Bar',  'slash not allowed' ],
    [ '../etc',   'path traversal attempt' ],
);

for my $t (@invalid) {
    my ( $input, $desc ) = @$t;
    is _normalize_distro($input), undef, "invalid: $desc";
}

done_testing;
