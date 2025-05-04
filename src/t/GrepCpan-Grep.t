use strict;
use warnings;

use Test2::Bundle::Extended;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;

my $test_methods = {
    config                => D(),
    git                   => D(),
    cache                 => D(),
    distros_per_page      => 30,
    search_context        => 5,
    search_context_file   => 60,
    search_context_distro => 10,
    git_binary            => D(),
    root                  => D(),
    HEAD                  => D(),    #qr{^[0-9a-f]+$},
};

my $config = {
    'binaries' => { 'git' => '/home/atoomic/bin/git' },
    'cache'    => {
        'directory' => '~APPDIR~/var/tmp',
        'version'   => '1.03'
    },
    'cookie' => {
        'history_name' => 'lastsearch',
        'history_size' => '20'
    },
    'demo'    => '0',
    'gitrepo' => '/metacpan-cpan-extracted',
    'limit'   => {
        'distros_per_page'      => '30',
        'files_git_run_bg'      => '2000',
        'files_per_search'      => '60',
        'search_context'        => '5',
        'search_context_distro' => '10',
        'search_context_file'   => '60'
    },
    'maxworkers' => '2',
    'nocache'    => '0',
    'timeout'    => {
        'grep_search' => '900',
        'user_search' => '18'
    }
};

$grepcpan::VERSION = '1.00_01';    # devel version

my $grep = GrepCpan::Grep->new( config => $config );
isa_ok $grep, 'GrepCpan::Grep';

#note explain config()->{'grepcpan'};

foreach my $k ( sort keys %$test_methods ) {
    can_ok $grep, $k;
    is $grep->can($k)->($grep), $test_methods->{$k}, "$k - default value";

    #note $grep->can($k)->($grep);
}

ok -x $grep->git_binary, "git is executable";

like $grep->current_version,
    qr{^
        [0-9]+\.[0-9_]+
        -cache-
        [0-9]+\.[0-9]+
        -cpan-
        [0-9a-f]+
    $}xs,
    "current_version";

{
    my $valid_input = {
        'distros/a/abbreviation/MANIFEST' =>
            [ 'distros/a', 'abbreviation', 'MANIFEST' ],
        'distros/a/accessors-fast/MANIFEST' =>
            [ 'distros/a', 'accessors-fast', 'MANIFEST' ],
        'distros/a/accessors/lib/accessors.pm' =>
            [ 'distros/a', 'accessors', 'lib/accessors.pm' ],
        'distros/e/eBay-API/eg/XML/getSearchResults.pl' =>
            [ 'distros/e', 'eBay-API', 'eg/XML/getSearchResults.pl' ],
        'distros/f/failures/lib/failures.pm' =>
            [ 'distros/f', 'failures', 'lib/failures.pm' ],
        'distros/f/fewer/Changes'    => [ 'distros/f', 'fewer', 'Changes' ],
        'distros/s/snapcast/LICENSE' =>
            [ 'distros/s', 'snapcast', 'LICENSE' ],
    };

    foreach my $input ( sort keys %$valid_input ) {
        is [ GrepCpan::Grep::massage_filepath($input) ] =>
            $valid_input->{$input},
            "massage_filepath($input)";
    }

}

done_testing;
