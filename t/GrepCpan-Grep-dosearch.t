#package grepcpan;
#use Dancer2;

use strict;
use warnings;

BEGIN {
    use FindBin;
    unshift @INC, $FindBin::Bin . "/lib";
}

use Test::Grep::MetaCPAN;

use Test2::V0;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;
use List::MoreUtils qw{natatime};

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
    'gitrepo' => '~APPDIR~/../../metacpan-cpan-extracted-lite',
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

#note explain $query;

my $is_number = validator(
    sub {
        match(qr{^[0-9]+$});
    }
);

my $is_boolean = validator(
    sub {
        match(qr{^[0-]$});
    }
);

my $is_a_known_distro = '';

my $query_looks_sane = validator(
    sub {
        my $got = $_;
        like $got, hash {

            field is_a_known_distro => $is_a_known_distro;
            field is_incomplete => $is_boolean;    # cannot guess the value

            field match => hash {
                field distros => D();
                field files   => D();
            };

            field results => array {

              #all_items sub { is ref $_, 'HASH', "results entry is a hash" };
                all_items hash {
                    field distro => D();
                    field files  => array {
                        all_items sub {
                            like $_ => qr{^[/\w\-_\.]+$},
                                'results/file: valid path file';
                        };
                    };
                    field matches => array {

                    #all_items sub { is ref $_, 'HASH', "match is one hash" };
                        all_items hash {
                            field file   => D();
                            field blocks => array {

                    #all_items sub { is ref $_, 'HASH', "match is one hash" };
                                all_items hash {
                                    field code       => D();
                                    field matchlines => array {
                                        all_items $is_number;
                                    };
                                    field start_at =>
                                        $is_number;    #match(qr{^[0-9]+$});
                                };
                            };
                        };
                    };
                    field 'prefix' => D();
                };
            };

            field search_in_progress => $is_boolean;  # cannot guess the value
            field 'time_elapsed' => match(qr{^[0-9]+\.[0-9]+});
            field version        => D();

        }
    }
);

my $grep = GrepCpan::Grep->new( config => $config );

my $queries = [
    'basic query without optional parameters' => { search => 'test' },
    "pcre query without optional parameters"  => { search => '[a-z]est' },
    'second page' => { search => 'test', page => 1 },
    'third page'  => { search => 'test', page => 2 },
    'fourth page' => { search => 'test', page => 3 },

    sub { $is_a_known_distro = 1 }, undef,
    'search distro eBay-API' =>
        { search => 'test', search_distro => 'eBay-API' },
];

my $iterator = natatime 2, @$queries;

# my $query = $grep->do_search(
#     search => 'test',

#     ## optional search parameters
#     #page            => 0,
#     #search_distro   => $qdistro,  # filter on a distribution
#     #search_file     => $file,
#     #filetype        => $filetype,
#     #caseinsensitive => $qci,
#     #list_files      => $qls,      # not used for now, only impact the view
# );

while ( my ( $name, $opts ) = $iterator->() ) {
    if ( ref $name eq 'CODE' ) {

        # custom code before next test
        $name->();
        next;
    }

    my $query = $grep->do_search(%$opts);
    is $query, $query_looks_sane, $name;
}

done_testing;
