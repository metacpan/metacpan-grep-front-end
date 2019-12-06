#package grepcpan;
#use Dancer2;

use strict;
use warnings;

use Test2::Bundle::Extended;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;

use File::Temp ();

my $tmp = File::Temp->newdir( "grep-XXXXXX", DIR => q[/tmp], UNLINK => 1 );
my $tmpdir = $tmp->dirname;
ok -d $tmpdir, "using tmp directory: $tmpdir";

my $config = {
    'maxworkers' => '2',
    'gitrepo'    => '~APPDIR~/../../metacpan-cpan-extracted-lite',
    'cache'      => {
        'directory' => $tmpdir,
        'version'   => "0.$$"
    },
};

my $grep = GrepCpan::Grep->new( config => $config );

note "test check_if_a_worker_is_available -- main pid $$";

my $MAX_WORKER = 2;
is $grep->config->{maxworkers}, $MAX_WORKER, "only $MAX_WORKER workers max";

my $mainpid = $$;

my @kids;
my $usr1 = 0;
local $SIG{USR1}
    = sub { ++$usr1 };    # used by the parent to know when the kid is ready
my $usr2 = 0;
local $SIG{USR2}
    = sub { ++$usr2 };    # used by the kid to know if the parent is alive

my $fork_a_worker = sub {
    $usr1 = 0;

    my $child_pid = fork();
    die "Fork failed" unless defined $child_pid;
    if ($child_pid) {
        push @kids, $child_pid;
        sleep 1 unless $usr1;
        note "kid $child_pid is ready";
    }
    else {
        my $ok = $grep->check_if_a_worker_is_available();
        die "Worker cannot get a pool" unless $ok;
        die unless kill USR1 => $mainpid;    # send a ready signal once
                                             # the worker is working....
        while ( kill USR2 => $mainpid )
        {    # run until as long as our parent is running
                #note "sending USR2 from $$";
            sleep 1;
        }
        exit;
    }
    return $child_pid;
};

ok $fork_a_worker->(), 'fork_a_worker' for ( 1 .. $MAX_WORKER );

is $grep->check_if_a_worker_is_available(), undef,
    "$_ cannot get an extra worker"
    for 1 .. 4;

kill 'KILL' => $kids[0];
ok waitpid( $kids[0], 0 ), 'one worker finished';
ok $fork_a_worker->(), 'can fork an extra worker';
is $grep->check_if_a_worker_is_available(), undef,
    "queue is full: cannot start an extra worker";

kill_all();
ok $fork_a_worker->(), 'fork extra worker' for ( 1 .. $MAX_WORKER );
kill_all();

done_testing;

sub kill_all {

    foreach my $pid (@kids) {
        kill 'KILL' => $pid;
        note "waiting $pid";
        ok waitpid( $pid, 0 ), "waiting for $pid";
    }
    @kids = ();
}
