use v5.36;

use strict;
use warnings;

local $| = 1;

use Test2::V0;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;
use File::Temp ();
use POSIX qw(:sys_wait_h);
use Fcntl qw(:flock);

my $tmp_cache = File::Temp->newdir( "grep-cache-XXXXXX", DIR => q[/tmp], UNLINK => 1 );
my $tmp_repo  = File::Temp->newdir( "grep-repo-XXXXXX",  DIR => q[/tmp], UNLINK => 1 );
my $cachedir  = $tmp_cache->dirname;
my $repodir   = $tmp_repo->dirname;
ok -d $cachedir, "using cache directory: $cachedir";

my $git;
foreach my $c (
    qw{ /opt/homebrew/bin/git /usr/local/cpanel/3rdparty/bin/git /usr/bin/git }
) {
    next unless -x $c;
    $git = $c;
}
die "missing git binary" unless length $git;

my $MAX_WORKERS = 2;

my $config = {
    'binaries' => { 'git' => $git },
    'cache'    => {
        'directory' => $cachedir,
        'version'   => "0.$$"
    },
    'gitrepo'    => $repodir,
    'maxworkers' => $MAX_WORKERS,
    'nocache'    => 1,
    'timeout'    => {
        'grep_search' => '10',
        'user_search' => '10'
    },
    'limit' => {
        'distros_per_page'      => '30',
        'files_git_run_bg'      => '2000',
        'files_per_search'      => '60',
        'search_context'        => '5',
        'search_context_distro' => '10',
        'search_context_file'   => '60'
    },
};

# Initialize a git repo with one commit so Git::Repository doesn't die on HEAD
system("$git init $repodir >/dev/null 2>&1") == 0
    or die "Failed to init repo";
system("cd $repodir && $git -c user.email=test\@test.com -c user.name=Test commit --allow-empty -m init >/dev/null 2>&1") == 0
    or die "Failed to create initial commit";
mkdir "$repodir/distros" unless -d "$repodir/distros";

my $grep = GrepCpan::Grep->new( config => $config );

# Ensure cache dir exists for worker lock files
$grep->cache();

# Occupy all worker slots by holding lock files
my @lock_fhs;
for my $id ( 1 .. $MAX_WORKERS ) {
    my $f = $grep->cache() . '/worker-id-' . $id;
    open( my $fh, '>', $f ) or die "cannot open $f: $!";
    flock( $fh, LOCK_EX | LOCK_NB )
        or die "cannot lock $f";
    push @lock_fhs, $fh;
}

is $grep->check_if_a_worker_is_available(), undef,
    "all workers are occupied";

# Now call run_git_cmd_limit — the child should detect too-busy and the parent
# should return [] after proper cleanup (alarm cancelled, pipe closed, child reaped).
my $result = $grep->run_git_cmd_limit(
    cmd   => [ 'grep', '-l', '-e', 'nonexistent', '--', '.' ],
    limit => 10,
);

is $result, [], "run_git_cmd_limit returns empty array when too busy";

# Verify no pending alarm — if the old code's alarm leak is present,
# this sleep would trigger a die.
{
    my $alarm_fired = 0;
    local $SIG{ALRM} = sub { $alarm_fired = 1 };
    # If there's a leaked alarm, it would fire within the original timeout (10s).
    # We just check that alarm(0) returns 0 (no pending alarm).
    my $remaining = alarm(0);
    is $remaining, 0, "no pending alarm after run_git_cmd_limit returns";
    is $alarm_fired, 0, "alarm handler was not invoked";
}

# Reap any zombie children
while ( waitpid( -1, WNOHANG ) > 0 ) { 1 }

# Release worker locks
@lock_fhs = ();

done_testing;
