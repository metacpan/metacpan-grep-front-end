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

# Test that get_list_of_files_to_search uses quotemeta on the distro filter.
# This exercises the Perl-side regex filter at line ~539, which is separate
# from the git pathspec validation above.

use GrepCpan::Grep;

{
    my $grep = GrepCpan::Grep->new(
        distros_per_page => 20,
    );

    # Build a fake cache with known distro keys
    my $cache = {
        distros => {
            'App-Foo'   => { prefix => 'distros/A/App-Foo',   files => ['lib/App/Foo.pm'] },
            'App-Bar'   => { prefix => 'distros/A/App-Bar',   files => ['lib/App/Bar.pm'] },
            'Try-Tiny'  => { prefix => 'distros/T/Try-Tiny',  files => ['lib/Try/Tiny.pm'] },
            'Foo.Bar'   => { prefix => 'distros/F/Foo.Bar',   files => ['lib/Foo/Bar.pm'] },
        },
    };

    # Normal substring match
    my $result = $grep->get_list_of_files_to_search(
        $cache, 'test', 0, 'App', undef, undef
    );
    is scalar @$result, 2, 'distro filter "App" matches 2 distros';

    # Regex metacharacters should be treated as literals, not regex
    # Without quotemeta, ".*" would match everything
    $result = $grep->get_list_of_files_to_search(
        $cache, 'test', 0, '.*', undef, undef
    );
    is scalar @$result, 0,
        'distro filter ".*" is literal (quotemeta), matches nothing';

    # Dot should be literal, not regex "any char"
    $result = $grep->get_list_of_files_to_search(
        $cache, 'test', 0, 'Foo.Bar', undef, undef
    );
    is scalar @$result, 1,
        'distro filter "Foo.Bar" matches literal dot only';

    # Parentheses should not be treated as regex groups
    $result = $grep->get_list_of_files_to_search(
        $cache, 'test', 0, 'App(Foo|Bar)', undef, undef
    );
    is scalar @$result, 0,
        'distro filter with regex alternation is literal, matches nothing';

    # Verify no Perl error from unbalanced regex chars
    for my $dangerous ( '(', '[', '{', '\\', '+', '?', '|', '$', '^' ) {
        my $r = $grep->get_list_of_files_to_search(
            $cache, 'test', 0, $dangerous, undef, undef
        );
        ok defined $r, "distro filter '$dangerous' does not crash";
    }
}

done_testing;
