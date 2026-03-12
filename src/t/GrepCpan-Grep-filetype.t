use strict;
use warnings;

use Test2::Bundle::Extended;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;

my $config = {
    'binaries' => { 'git' => '/usr/bin/git' },
    'cache'    => {
        'directory' => '/tmp/grep-test-filetype',
        'version'   => '0.01'
    },
    'gitrepo'    => '/metacpan-cpan-extracted',
    'maxworkers' => '1',
    'nocache'    => '1',
    'limit'      => {
        'distros_per_page'      => '30',
        'files_git_run_bg'      => '2000',
        'files_per_search'      => '60',
        'search_context'        => '5',
        'search_context_distro' => '10',
        'search_context_file'   => '60'
    },
    'timeout' => {
        'grep_search' => '900',
        'user_search' => '18'
    }
};

my $grep = GrepCpan::Grep->new( config => $config );

# --- _parse_query_filetype ---

is $grep->_parse_query_filetype(undef), undef, 'undef returns undef';
is $grep->_parse_query_filetype(''),    undef, 'empty string returns undef';

is $grep->_parse_query_filetype('.pm'), ['.pm'], 'single extension';
is $grep->_parse_query_filetype('.pm,.pl'),  ['.pm', '.pl'], 'comma-separated extensions';
is $grep->_parse_query_filetype('.pm, .pl'), ['.pm', '.pl'], 'comma-space separated';

is $grep->_parse_query_filetype('*.pm'), ['*.pm'], 'glob pattern preserved';

# directory traversal blocked
is $grep->_parse_query_filetype('..'), undef, 'double dots rejected';
is $grep->_parse_query_filetype('.pm,..,.pl'), undef, 'double dots in list rejected';

# invalid characters filtered
is $grep->_parse_query_filetype('.pm, <script>, .pl'), ['.pm', '.pl'],
    'invalid chars filtered out';

# --- _parse_and_check_query_filetype ---

{
    my $adj = {};
    my $result = $grep->_parse_and_check_query_filetype('.pm', $adj);
    is $result, ['.pm'], 'valid filetype passes through';
    is $adj, {}, 'no adjustment for valid input';
}

{
    my $adj = {};
    my $result = $grep->_parse_and_check_query_filetype('.pm, <bad>, .pl', $adj);
    is $result, ['.pm', '.pl'], 'invalid entries filtered';
    ok exists $adj->{'qft'}, 'adjustment recorded for modified input';
    like $adj->{'qft'}{'error'}, qr/invalid characters/i, 'error message present';
}

{
    # empty string should return undef (falsy)
    my $adj = {};
    my $result = $grep->_parse_and_check_query_filetype('', $adj);
    ok !$result, 'empty filetype returns falsy';
}

# --- _parse_ignore_files ---

is $grep->_parse_ignore_files(''), undef, 'empty returns undef';

{
    my $result = $grep->_parse_ignore_files('t/*');
    is $result, [':!/*t/*'], 'non-wildcard pattern gets /* prefix';
}

{
    my $result = $grep->_parse_ignore_files('*.md');
    is $result, [':!*.md'], 'wildcard pattern stays as-is';
}

{
    my $result = $grep->_parse_ignore_files('*.md, t/*, *.json');
    is scalar @$result, 3, 'multiple ignore patterns';
    is $result->[0], ':!*.md',   'first pattern (starts with *, no prefix)';
    is $result->[1], ':!/*t/*',  'second pattern (no leading *, gets /* prefix)';
    is $result->[2], ':!*.json', 'third pattern (starts with *, no prefix)';
}

# directory traversal blocked
is $grep->_parse_ignore_files('..'), undef, 'double dots rejected';
is $grep->_parse_ignore_files('t/.., *.md'), undef, 'double dots in list rejected';

# --- _parse_and_check_ignore_files ---

{
    my $adj = {};
    my $result = $grep->_parse_and_check_ignore_files('*.md', $adj);
    ok $result, 'valid ignore files returns rules';
    is $adj, {}, 'no adjustment for valid input';
}

{
    my $adj = {};
    my $result = $grep->_parse_and_check_ignore_files('..', $adj);
    ok !$result, 'invalid ignore files returns falsy';
    ok exists $adj->{'qifl'}, 'adjustment recorded';
    like $adj->{'qifl'}{'error'}, qr/invalid/i, 'error message present';
}

done_testing;
