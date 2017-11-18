use strict;
use warnings;

use Test2::Bundle::Extended;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;

my @tests = (
    [ qq{some\ttabs\t\t} => q{some.tabs..} ],
    [
        q{somethïng diffêrènt with àccęnts} =>
            q{someth.ng diff.r.nt with .cc.nts}
    ],
);

my @preserve = (
    undef,                          '',
    "Something to drink",           "with some 123456789 numbers",
    q{and now some quotes '"' <--}, q{some\tescaped\ttabs\t\t},
    q[.*:;{}&-?()<>()@$|=],         q{()},
);

push @tests, map { [ $_, $_ ] } @preserve;

foreach my $t (@tests) {
    my ( $in, $out ) = @$t;
    is GrepCpan::Grep::_sanitize_search($in), $out,
        "_sanitize_search(" . ( $in // 'undef' ) . ")";
}

done_testing;
