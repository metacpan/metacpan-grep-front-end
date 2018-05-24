use strict;
use warnings;

use Test2::Bundle::Extended;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;

my @fixed_string = ( undef, "Something to drink", "a basic= research~ 1", );

my @pcre = ( q{[a-z]}, q{?:(a|b)}, q{^abcd}, q{abcd$}, );

is GrepCpan::Grep::_get_git_grep_flavor($_) => '--fixed-string'
    foreach @fixed_string;
is GrepCpan::Grep::_get_git_grep_flavor($_) => '-P' foreach @pcre;

done_testing;
