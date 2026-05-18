use strict;
use warnings;
use utf8;

use Test2::Bundle::Extended;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;

# _sanitize_search now only strips newlines — all other characters pass
# through unchanged.  Regex validation is handled separately by
# _validate_pcre_pattern.

my @tests = (
    # Tabs are preserved (no longer replaced by '.')
    [ qq{some\ttabs\t\t} => qq{some\ttabs\t\t} ],
    # Unicode is preserved
    [
        q{somethïng diffêrènt with àccęnts} =>
            q{somethïng diffêrènt with àccęnts}
    ],
    # Newlines are stripped
    [ "line1\nline2\n" => "line1line2" ],
    # Characters that were previously replaced (like +) are now preserved
    [ q{\d+(,\d+)?}   => q{\d+(,\d+)?} ],
    [ q{\bOff\s*\(}   => q{\bOff\s*\(} ],
    [ q{foo#bar}      => q{foo#bar} ],
);

my @preserve = (
    undef,                          '',
    "Something to drink",           "with some 123456789 numbers",
    q{and now some quotes '"' <--}, q{some\tescaped\ttabs\t\t},
    q[.*:;{}&-?()<>()@$|=],         q{()},
    q{日本語テスト},                  q{café résumé naïve},
    q{+?^},
);

push @tests, map { [ $_, $_ ] } @preserve;

foreach my $t (@tests) {
    my ( $in, $out ) = @$t;
    is GrepCpan::Grep::_sanitize_search($in), $out,
        "_sanitize_search(" . ( $in // 'undef' ) . ")";
}

done_testing;
