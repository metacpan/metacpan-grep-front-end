#package grepcpan;
#use Dancer2;

use strict;
use warnings;

use Test2::V0;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;

use File::Temp ();

my $tmp = File::Temp->newdir( "grep-XXXXXX", DIR => q[/tmp], UNLINK => 1 );
my $tmpdir = $tmp->dirname;
ok -d $tmpdir, "using tmp directory: $tmpdir";

$grepcpan::VERSION = "0.01";

### probably move to a test helper somewhere
my $config = {
    'binaries' => { 'git' => '/home/atoomic/bin/git' },
    'cache'    => {
        'directory' => $tmpdir,
        'version'   => "0.$$"
    },
    'cookie' => {
        'history_name' => 'lastsearch',
        'history_size' => '20'
    },
    'demo'    => '0',
    'gitrepo' => '~APPDIR~/../../metacpan-extracted-lite',
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

my $grep = GrepCpan::Grep->new( config => $config );

my $query = $grep->do_search(
    search => 'test',

    # optional parameters
    #page            => 0,
    #search_distro   => $qdistro,  # filter on a distribution
    #search_file     => $file,
    #filetype        => $filetype,
    #caseinsensitive => $qci,
    #list_files      => $qls,      # not used for now, only impact the view
);

#note explain $query;

# https://metacpan.org/pod/Test2::Tools::Compare
# once done move it to a 'is'
like $query, hash {

    field is_a_known_distro => '';
    field is_incomplete     => match(qr{^[01]$});    # cannot guess the value

    field match => hash {
        field distros => D();
        field files   => D();
    };

    field results => array {

        #all_items isa_ok('HASH');
        all_items sub { is ref $_, 'HASH', "results entry is a hash" };
    };

    field search_in_progress => match(qr{^[01]$});    # cannot guess the value
    field 'time_elapsed' => match(qr{^[0-9]+\.[0-9]+});
    field version        => D();

}, 'query result looks sane';

done_testing;
