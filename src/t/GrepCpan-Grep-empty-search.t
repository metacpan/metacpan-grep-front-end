use strict;
use warnings;

use Test2::Bundle::Extended;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;

# Minimal config — no git repo needed since empty queries return early
my $config = {
    'binaries' => { 'git' => '/usr/bin/git' },
    'cache'    => {
        'directory' => '/tmp/grepcpan-test-empty',
        'version'   => '0.01'
    },
    'gitrepo'    => '/nonexistent',
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

$grepcpan::VERSION = '1.00_01';

my $grep = GrepCpan::Grep->new( config => $config );

# Expected structure for empty query results
my $empty_result = hash {
    field is_incomplete      => 0;
    field search_in_progress => 0;
    field match              => hash {
        field files   => 0;
        field distros => 0;
    };
    field adjusted_request => hash {};
    field results          => array { end() };
    field time_elapsed     => '0.000';
    field is_a_known_distro => 0;
};

# undef search
{
    my $result = $grep->do_search( search => undef );
    is $result, $empty_result, 'undef search returns empty results';
}

# empty string search
{
    my $result = $grep->do_search( search => '' );
    is $result, $empty_result, 'empty string search returns empty results';
}

# whitespace-only search
{
    my $result = $grep->do_search( search => '   ' );
    is $result, $empty_result, 'whitespace-only search returns empty results';
}

# tab/newline-only search
{
    my $result = $grep->do_search( search => "\t\n" );
    is $result, $empty_result, 'tab/newline-only search returns empty results';
}

done_testing;
