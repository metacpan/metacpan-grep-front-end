use strict;
use warnings;

use Test2::Bundle::Extended;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;

# Verify that XSS payloads in qft trigger the adjusted_request error path,
# confirming the template must escape alert.danger output.

my $config = {
    'binaries' => { 'git' => '/usr/bin/git' },
    'cache'    => {
        'directory' => '/tmp/grepcpan-test-cache',
        'version'   => '1.00'
    },
    'cookie' => {
        'history_name' => 'lastsearch',
        'history_size' => '20'
    },
    'demo'    => '0',
    'gitrepo' => '/nonexistent',
    'limit'   => {
        'distros_per_page'      => '30',
        'files_git_run_bg'      => '2000',
        'files_per_search'      => '60',
        'search_context'        => '5',
        'search_context_distro' => '10',
        'search_context_file'   => '60'
    },
    'maxworkers' => '2',
    'nocache'    => '1',
    'timeout'    => {
        'grep_search' => '900',
        'user_search' => '18'
    }
};

$grepcpan::VERSION = '1.00_01';

my $grep = GrepCpan::Grep->new( config => $config );
isa_ok $grep, 'GrepCpan::Grep';

# XSS payload in filetype filter
{
    my $adjusted = {};
    my $xss_input = '<script>alert("xss")</script>';
    $grep->_parse_and_check_query_filetype($xss_input, $adjusted);

    ok exists $adjusted->{qft}, "XSS payload triggers adjusted_request for qft";
    ok defined $adjusted->{qft}{error}, "error message is set";
    like $adjusted->{qft}{error}, qr/<script>/, "raw XSS payload appears in error message (must be escaped in template)";
    is $adjusted->{qft}{value}, '', "sanitized value is empty";
}

# Valid filetype should NOT trigger adjustment
{
    my $adjusted = {};
    $grep->_parse_and_check_query_filetype('*.pm', $adjusted);

    ok !exists $adjusted->{qft}, "valid filetype does not trigger adjustment";
}

# Mixed valid and invalid input
{
    my $adjusted = {};
    $grep->_parse_and_check_query_filetype('*.pm,<img onerror=alert(1)>', $adjusted);

    ok exists $adjusted->{qft}, "mixed input with XSS triggers adjustment";
    like $adjusted->{qft}{error}, qr/invalid characters/, "error mentions invalid characters";
    is $adjusted->{qft}{value}, '*.pm', "sanitized value keeps only valid part";
}

done_testing;
