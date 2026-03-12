use strict;
use warnings;

use Test2::Bundle::Extended;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;

my $config = {
    'binaries' => { 'git' => '/usr/bin/git' },
    'cache'    => {
        'directory' => '/tmp/grep-test-pagination',
        'version'   => '0.01'
    },
    'gitrepo'    => '/metacpan-cpan-extracted',
    'maxworkers' => '1',
    'nocache'    => '1',
    'limit'      => {
        'distros_per_page'      => '3',    # small for testing
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

# Build a fake cache with multiple distros
my $cache = {
    distros => {
        'Acme'     => { prefix => 'distros/a/Acme',     files => ['lib/Acme.pm'] },
        'Bob'      => { prefix => 'distros/b/Bob',      files => ['lib/Bob.pm'] },
        'Cat'      => { prefix => 'distros/c/Cat',      files => ['lib/Cat.pm'] },
        'Dog'      => { prefix => 'distros/d/Dog',      files => ['lib/Dog.pm'] },
        'Elephant' => { prefix => 'distros/e/Elephant', files => ['lib/Elephant.pm'] },
        'Fox'      => { prefix => 'distros/f/Fox',      files => ['lib/Fox.pm', 'lib/Fox/Helper.pm'] },
        'Goat'     => { prefix => 'distros/g/Goat',     files => ['lib/Goat.pm'] },
    },
};

# Page 0: first 3 distros (alphabetically)
{
    my $files = $grep->get_list_of_files_to_search(
        $cache, 'test', 0, undef, undef, undef
    );
    is scalar @$files, 3, 'page 0 returns distros_per_page items';
}

# Page 1: next 3
{
    my $files = $grep->get_list_of_files_to_search(
        $cache, 'test', 1, undef, undef, undef
    );
    is scalar @$files, 3, 'page 1 returns 3 items';
}

# Page 2: remaining 1
{
    my $files = $grep->get_list_of_files_to_search(
        $cache, 'test', 2, undef, undef, undef
    );
    is scalar @$files, 1, 'page 2 returns remaining item';
}

# Page 99: beyond end
{
    my $files = $grep->get_list_of_files_to_search(
        $cache, 'test', 99, undef, undef, undef
    );
    is scalar @$files, 0, 'page beyond end returns empty';
}

# Known distro: returns all files for that distro
{
    my $files = $grep->get_list_of_files_to_search(
        $cache, 'test', 0, 'Fox', undef, undef
    );
    is scalar @$files, 2, 'known distro returns all its files';
    like $files->[0], qr{Fox/lib/Fox\.pm},        'first file';
    like $files->[1], qr{Fox/lib/Fox/Helper\.pm}, 'second file';
}

# Known distro + specific file
{
    my $files = $grep->get_list_of_files_to_search(
        $cache, 'test', 0, 'Fox', 'lib/Fox/Helper.pm', undef
    );
    is scalar @$files, 1, 'known distro + file filter returns 1';
    like $files->[0], qr{Fox/lib/Fox/Helper\.pm}, 'correct file returned';
}

# Distro filter (partial match, not exact)
{
    my $files = $grep->get_list_of_files_to_search(
        $cache, 'test', 0, 'Fox', undef, undef
    );
    ok scalar @$files > 0, 'distro filter returns matches';
}

# Perl file preference: when multiple files, .pm/.pl preferred
{
    my $cache_multi = {
        distros => {
            'Multi' => {
                prefix => 'distros/m/Multi',
                files  => ['README', 'Makefile.PL', 'lib/Multi.pm', 'Changes']
            },
        },
    };
    my $files = $grep->get_list_of_files_to_search(
        $cache_multi, 'test', 0, undef, undef, undef
    );
    is scalar @$files, 1, 'one file per distro in general search';
    like $files->[0], qr{lib/Multi\.pm}, '.pm file preferred over others';
}

done_testing;
