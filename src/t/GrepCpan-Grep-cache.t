use strict;
use warnings;

use Test2::Bundle::Extended;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;
use File::Temp ();
use File::Path ();
use Digest::MD5 qw(md5_hex);

my $tmp    = File::Temp->newdir( "grep-cache-XXXXXX", DIR => '/tmp', UNLINK => 1 );
my $tmpdir = $tmp->dirname;
ok -d $tmpdir, "using tmp directory: $tmpdir";

$grepcpan::VERSION = '1.00';

my $cache_dir = "$tmpdir/1.03/HEAD-fakehead";
File::Path::make_path($cache_dir);

my $config = {
    'binaries' => { 'git' => '/usr/bin/git' },
    'cache'    => {
        'directory' => $tmpdir,
        'version'   => '1.03'
    },
    'gitrepo'    => '/metacpan-cpan-extracted',
    'maxworkers' => '1',
    'nocache'    => '0',
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

# Pre-set cache to avoid triggering git repo access
$grep->{cache} = $cache_dir;

# --- _get_cache_file ---

{
    my $file = $grep->_get_cache_file( ['test', 'query'] );
    like $file, qr{/search-ls-[0-9a-f]+\.cache$}, 'default cache file has search-ls prefix';
    ok length($file) > 10, 'cache file path is reasonable length';
}

{
    my $file = $grep->_get_cache_file( ['test', 'query'], 'custom-type' );
    like $file, qr{/custom-type-[0-9a-f]+\.cache$}, 'custom type prefix in cache filename';
}

# Same keys produce same file
{
    my $file1 = $grep->_get_cache_file( ['a', 'b', 'c'] );
    my $file2 = $grep->_get_cache_file( ['a', 'b', 'c'] );
    is $file1, $file2, 'same keys produce same cache file';
}

# Different keys produce different files
{
    my $file1 = $grep->_get_cache_file( ['a', 'b'] );
    my $file2 = $grep->_get_cache_file( ['a', 'c'] );
    isnt $file1, $file2, 'different keys produce different cache files';
}

# Undef values handled gracefully
{
    my $file = $grep->_get_cache_file( [undef, 'test', undef] );
    like $file, qr{\.cache$}, 'undef values in keys handled';
}

# --- _save_cache / _load_cache ---

{
    my $cache_file = "$cache_dir/test-save.cache";
    my $data = {
        distros => { 'Foo' => { files => ['lib/Foo.pm'] } },
        search  => 'test',
    };

    $grep->_save_cache( $cache_file, $data );
    ok -e $cache_file, 'cache file created';

    my $loaded = $grep->_load_cache($cache_file);
    is $loaded->{search}, 'test', 'loaded cache has correct search';
    is $loaded->{distros}{Foo}{files}, ['lib/Foo.pm'], 'loaded cache has correct data';
}

# _load_cache returns undef for nonexistent file
{
    my $result = $grep->_load_cache('/tmp/nonexistent-cache-file-xyz.cache');
    ok !$result, 'nonexistent cache file returns falsy';
}

# _save_cache with nocache skips writing
{
    my $grep_nocache = GrepCpan::Grep->new(
        config => { %$config, nocache => 1 }
    );
    my $cache_file = "$tmpdir/should-not-exist.cache";
    $grep_nocache->_save_cache( $cache_file, { test => 1 } );
    ok !-e $cache_file, 'nocache prevents writing cache file';
}

# _load_cache with nocache returns undef
{
    my $grep_nocache = GrepCpan::Grep->new(
        config => { %$config, nocache => 1 }
    );
    my $cache_file = "$cache_dir/test-save.cache";
    my $result = $grep_nocache->_load_cache($cache_file);
    ok !$result, 'nocache prevents loading cache';
}

# --- massage_path ---

{
    my $result = $grep->massage_path('/some/absolute/path');
    is $result, '/some/absolute/path', 'absolute path unchanged';
}

{
    my $result = $grep->massage_path('~APPDIR~/var/tmp');
    unlike $result, qr{~APPDIR~}, '~APPDIR~ placeholder replaced';
    like $result, qr{/var/tmp$}, 'path suffix preserved';
}

{
    my $result = $grep->massage_path('');
    ok !defined $result || !length($result), 'empty path returns falsy';
}

# --- cache_cleanup ---

{
    # Create old version directories that should be cleaned up
    my $old_dir = "$tmpdir/0.99/HEAD-abc123";
    File::Path::make_path($old_dir);
    ok -d $old_dir, 'old cache dir created for cleanup test';

    my $current_dir = "$tmpdir/1.03/HEAD-current";
    File::Path::make_path($current_dir);

    $grep->cache_cleanup($current_dir);

    ok !-d "$tmpdir/0.99", 'old version directory cleaned up';
    ok -d $current_dir, 'current cache dir preserved';
}

done_testing;
