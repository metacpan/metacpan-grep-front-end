use strict;
use warnings;
use utf8;

use Test2::Bundle::Extended;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;

my @fixed_string = (
    undef,
    "Something to drink",
    "a basic= research~ 1",
    # Unicode: these should be treated as literal fixed-string searches
    "\x{65e5}\x{672c}\x{8a9e}",    # Japanese (日本語)
    "na\x{ef}ve",                   # Latin with diaeresis (naïve)
    "\x{043f}\x{0435}\x{0440}\x{043b}",  # Cyrillic (перл)
    "caf\x{e9}",                    # French accent (café)
);

my @pcre = ( q{[a-z]}, q{?:(a|b)}, q{^abcd}, q{abcd$}, );

is GrepCpan::Grep::_get_git_grep_flavor($_) => '--fixed-string'
    foreach @fixed_string;
is GrepCpan::Grep::_get_git_grep_flavor($_) => '-P' foreach @pcre;

done_testing;
