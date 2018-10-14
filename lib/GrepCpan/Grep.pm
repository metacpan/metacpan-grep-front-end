package GrepCpan::Grep;

use strict;
use warnings;

use Git::Repository ();

=pod

git grep -l to a file to cache the result ( limit it to 200 files and run it in background after ?? )
use this list for pagination
then do a query for a set of files with context

grepcpan@grep.cpan.me [~/minicpan_grep.git]# time git grep -C15 -n xyz HEAD | head -n 200

=cut

use Simple::Accessor qw{ config git cache distros_per_page search_context
    search_context_file search_context_distro
    git_binary root HEAD
};
use POSIX qw{:sys_wait_h setsid};
use Proc::ProcessTable ();
use YAML::Syck         ();
use Time::HiRes        ();
use File::Slurp        ();
use IO::Handle         ();
use Fcntl qw(:flock SEEK_END);
use Test::More;

use FindBin;
use utf8;

use Digest::MD5 qw( md5_hex );

use constant END_OF_FILE_MARKER => qq{##______END_OF_FILE_MARKER______##};
use constant TOO_BUSY_MARKER    => qq{##______TOO_BUSY_MARKER______##};

use v5.022;

$YAML::Syck::LoadBlessed = 0;
$YAML::Syck::SortKeys    = 1;

sub _build_git {
    my $self = shift;

    my $gitdir = $self->massage_path( $self->config()->{'gitrepo'} );
    die qq{Invalid git directory $gitdir}
        unless defined $gitdir && -d $gitdir;

    return Git::Repository->new(
        work_tree => $gitdir,
        { git => $self->git_binary }
    );
}

sub _build_git_binary {
    my $self = shift;

    my $git = $self->config()->{'binaries'}->{'git'};
    return $git if $git && -x $git;
    $git = qx{which git};
    chomp $git;

    return $git;
}

sub _build_HEAD {
    my $self = shift;

    my $head = $self->git()->run(qw{rev-parse --short HEAD});
    chomp $head if defined $head;
    die unless length($head);

    return $head;
}

sub cpan_index_at {
    my ($self) = @_;

    my $now          = time();
    my $last_refresh = $self->{_cpan_index_last_refresh_at} // 0;

    # cache the value for 90 minutes
    if ( !$last_refresh || ( $now - $last_refresh ) < ( 60 * 90 ) ) {
        $self->{_cpan_index_last_refresh_at} = $now;
        $self->{_cpan_index_at}              = $self->_build_cpan_index_at();
    }

    return $self->{_cpan_index_at};
}

sub _build_cpan_index_at {
    my $self = shift;

    # git log -n1 --date=format:'%B %-d %Y' --pretty=format:'%ad'
    my $out = $self->git()->run(
        'log',                        '-n1',
        q[--date=format:'%B %-d %Y'], q[--pretty=format:'%ad']
    ) // '';
    chomp $out;
    $out =~ s{['"]}{}g;

    return $out;    # . ' ' . $self->HEAD;
}

sub _build_cache {
    my $self = shift;

    # also use HEAD ?? FIXME
    my $dir
        = ( $self->config()->{'cache'}->{'directory'} ) . '/'
        . ( $self->config()->{'cache'}->{'version'} || 0 )
        . '/HEAD-'
        . $self->HEAD;
    die unless $dir;

    $dir = $self->massage_path($dir);
    local $ENV{PATH} = '/bin:' . ( $ENV{PATH} // '' );
    qx{mkdir -p $dir};
    die unless -d $dir;

    # cleanup after directory structure creation
    $self->cache_cleanup($dir);

    return $dir;
}

sub _build_root {
    my $self = shift;

    # hard code root dir in production
    return $self->config()->{'root_dir'} if $self->config()->{'root_dir'};

    return $FindBin::Bin . '/';
}

sub cache_cleanup {    # aka tmpwatch
    my ( $self, $current_cachedir ) = @_;

    return unless $current_cachedir;

    my @path = split qr{/}, $current_cachedir;

    {                  # purge old cache versions
        my @tmp = @path;
        pop @tmp for 1 .. 2;

        my $cache_root = join '/', @tmp;
        if ( opendir( my $tmp_dh, $cache_root ) ) {
            foreach my $dir ( readdir($tmp_dh) ) {
                next if $dir eq '.' || $dir eq '..';
                my $fdir = $cache_root . '/' . $dir;
                next
                    if $dir eq
                    ( $self->config()->{'cache'}->{'version'} || 0 );
                next if -l $fdir;
                next unless -d $fdir;
                next unless length $fdir > 5;

                local $ENV{PATH} = '/bin:' . ( $ENV{PATH} // '' );
                qx{rm -rf $fdir}
                    ; # kind of dangerous but should be ok, we are controlling these values
            }
            close($tmp_dh);
        }
    }

    {                 # purge old HEAD directories for the same version
        my @tmp = @path;
        pop @tmp;
        my $version_cache = join '/', @tmp;
        if ( opendir( my $tmp_dh, $version_cache ) ) {
            foreach my $dir ( readdir($tmp_dh) ) {
                next if $dir eq '.' || $dir eq '..';
                my $fdir = $version_cache . '/' . $dir;
                next if -l $fdir;
                next unless -d $fdir;
                next if $fdir eq $current_cachedir;

                local $ENV{PATH} = '/bin:' . ( $ENV{PATH} // '' );
                qx{rm -rf $fdir}; # purge old cache, in the same weird fashion
            }
        }
    }

    return;
}

sub massage_path {
    my ( $self, $s ) = @_;

    return unless defined $s;
    my $appdir = $self->root;
    $s =~ s{~APPDIR~}{$appdir}g;

    return $s;
}

## TODO factorize
BEGIN {
    # initialize (integer) value from config
    foreach my $key (
        qw{distros_per_page search_context search_context_distro search_context_file}
        )
    {
        no warnings;
        no strict 'refs';    ## no critic qw(ProhibitNoStrict)
        my $sub = '_build_' . $key;
        *$sub = sub {
            my $self = shift;
            my $v    = $self->config()->{limit}{$key};
            $v or die;

            return int($v);
        };
    }
}

sub _sanitize_search {
    my $s = shift;
    return undef unless defined $s;
    $s =~ s{\n}{}g;
    $s =~ s{'}{\'}g;

    # whitelist possible characters ?
    $s =~ s{[^\^a-zA-Z0-9\-\.\?\\*\&_'"~!\$\%()\[\]\{\}:;<>,/\@| =]}{.}g;

    return $s;
}

sub _get_git_grep_flavor {
    my $s = shift;

    # regular characters
    return q{--fixed-string}
        if !defined $s || $s =~ qr{^[a-zA-Z0-9&_'"~:;<>,/ =]+$};
    return q{-P};
}

# idea use git rev-parse HEAD to include it in the cache name

sub do_search {
    my ( $self, %opts ) = @_;

    my ( $search, $search_distro, $search_file, $filetype, $caseinsensitive, )
        = (
        $opts{search},      $opts{search_distro},
        $opts{search_file}, $opts{filetype},
        $opts{caseinsensitive},
        );

    my $t0 = [Time::HiRes::gettimeofday];

    my $gitdir = $self->git()->work_tree;

    $search = _sanitize_search($search);

    my $results = $self->_do_search(%opts);

    my $cache             = $results->{cache};
    my $output            = $results->{output};
    my $is_a_known_distro = $results->{is_a_known_distro};

    my $elapsed = sprintf( "%.3f",
        Time::HiRes::tv_interval( $t0, [Time::HiRes::gettimeofday] ) );

    return {
        is_incomplete      => $cache->{is_incomplete}      || 0,
        search_in_progress => $cache->{search_in_progress} || 0,
        match              => $cache->{match},
        results            => $output,
        time_elapsed       => $elapsed,
        is_a_known_distro  => $is_a_known_distro,
        version            => $self->current_version(),
    };
}

sub _do_search {
    my ( $self, %opts ) = @_;

    my ( $search, $page, $search_distro, $search_file,
        $filetype, $caseinsensitive, )
        = (
        $opts{search}, $opts{page}, $opts{search_distro}, $opts{search_file},
        $opts{filetype}, $opts{caseinsensitive},
        );

    $page //= 0;
    $page = 0 if $page < 0;

    my $cache = $self->get_match_cache( $search, $search_distro,
        $filetype, $caseinsensitive );

    my $is_a_known_distro
        = defined $search_distro
        && length $search_distro
        && exists $cache->{distros}->{$search_distro};

    my $context = $self->search_context();    # default context
    if ( defined $search_file ) {
        $context = $self->search_context_file();
    }
    elsif ($is_a_known_distro) {
        $context = $self->search_context_distro();
    }

    my $files_to_search
        = $self->get_list_of_files_to_search( $cache, $search, $page,
        $search_distro, $search_file, $filetype );    ## notidy

    # can also probably simply use Git::Repo there
    my $matches;

    if ( scalar @$files_to_search ) {
        my $flavor  = _get_git_grep_flavor($search);
        my @git_cmd = ('grep');
        push @git_cmd, '-i' if $caseinsensitive;
        push @git_cmd,
            (
            '-n', '--heading', '-C', $context, $flavor, '-e', $search, '--',
            @$files_to_search
            );
        my @out = $self->git->run(@git_cmd);
        $matches = \@out;
    }

    # now format the output in order to be able to use it
    my @output;
    my $current_file;
    my @diffblocks;
    my $diff = '';
    my $line_number;
    my $start_line;
    my @matching_lines;

    my $add_block = sub {
        return unless $diff && length($diff);
        push @diffblocks,
            {
            code       => $diff,
            start_at   => $start_line || 1,
            matchlines => [@matching_lines]
            };
        return;
    };

    my $process_file = sub {
        return unless defined $current_file;
        $add_block->();    # push the last block

        my ( $where, $distro, $shortpath ) = massage_filepath($current_file);
        return unless length $shortpath;
        my $prefix = join '/', $where, $distro;

        my $result = $cache->{distros}->{$distro} // {};
        $result->{distro}  //= $distro;
        $result->{matches} //= [];

        #@diffblocks = scalar @diffblocks; # debugging clear the blocks
        push @{ $result->{matches} },
            { file => $shortpath, blocks => [@diffblocks] };
        return
            if scalar @output
            && $output[-1] eq
            $result;    # same hash do not add it more than once
        push @output, $result;

        return;
    };

    foreach my $line (@$matches) {
        if ( !defined $current_file && $line !~ qr{^([0-9]+)[-:]} )
        { # when more than one block match we are just going to have a -- separator
            $current_file = $line;
        }
        elsif ( $line eq '--' ) {
            $process_file->();
            undef $current_file;
            $diff       = '';
            @diffblocks = ();
            undef $start_line;
            undef $line_number;
            @matching_lines = ();
        }
        elsif ( $line =~ s{^([0-9]+)([-:])}{} ) {    # mainly else
            my $new_line = $1;
            my $prefix   = $2;
            $start_line //= $new_line;
            if ( length($line) > 250 )
            {    # max length autorized ( js minified & co )
                $line = substr( $line, 0, 250 ) . '...';
            }
            if ( !defined $line_number || $new_line == $line_number + 1 ) {

                # same block
                push @matching_lines, $new_line if $prefix eq ':';
                $diff .= $line . "\n";
            }
            else {
                # new block
                $add_block->();
                $diff = $line . "\n";    # reset the block
            }
            $line_number = $new_line;
        }
    }
    $process_file->();                   # process the last block

    # update results...
    #update_match_counter( $cache );

    return {
        cache             => $cache,
        output            => \@output,
        is_a_known_distro => $is_a_known_distro
    };
}

sub update_match_counter {
    my ($cache) = @_;

    my ( $count_distro, $count_files ) = ( 0, 0 );
    foreach my $distro ( sort keys %{ $cache->{distros} } ) {
        my $c
            = eval { scalar @{ $cache->{distros}->{$distro}->{matches} } }
            // 0;
        next unless $c;
        ++$count_distro;
        $count_files += $c;
    }

    $cache->{match} = {
        files   => $count_files,
        distros => $count_distro
    };

    return;
}

sub current_version {
    my ($self) = @_;

    return $self->{__version__} if $self->{__version__};

    # cache the current grep metacpan version
    $self->{__version__} = join(
        '-',
        $grepcpan::VERSION,
        'cache' => $self->config()->{'cache'}->{'version'},
        'grep'  => eval {
            scalar Git::Repository->new(
                work_tree => $self->root,
                { git => $self->git_binary }
            )->run(qw{rev-parse --short HEAD});
        } // '',
        'cpan' => eval { scalar $self->git->run(qw{rev-parse --short HEAD}) }
            // '',
    );

    #my $run     = scalar $self->git->run(qw{rev-parse --short HEAD});
    # ....

    return $self->{__version__};
}

sub get_list_of_files_to_search {
    my ( $self, $cache, $search, $page, $distro, $search_file, $filetype )
        = @_;    ## notidy

# try to get one file per distro except if we do not have enough distros matching
# maybe sort the files by distros having the most matches ??

    my @flat_list;    # full flat list before pagination

    # if we have enough distros
    my $limit = $self->distros_per_page;
    if ( defined $distro && exists $cache->{distros}->{$distro} ) {

        # let's pick all the files for this distro: as we are looking for it
        return [] unless exists $cache->{distros}->{$distro};
        my $prefix = $cache->{distros}->{$distro}->{prefix};
        @flat_list = map { $prefix . '/' . $_ }
            @{ $cache->{distros}->{$distro}->{files} };    # all the files
        if ( defined $search_file ) {
            @flat_list = grep { $_ eq $prefix . '/' . $search_file }
                @flat_list;    # make sure the file is known and sanitize
        }
    }
    else {                     # pick one single file per distro
        @flat_list = map {
            my $distro = $_;  # warning this is over riding the input variable
            my $prefix        = $cache->{distros}->{$distro}->{prefix};
            my $list_of_files = $cache->{distros}->{$distro}->{files};
            my $candidate = $list_of_files->[0];    # only the first file
            if ( scalar @$list_of_files > 1 ) {

                # try to find a more perlish file first
                foreach my $f (@$list_of_files) {
                    if ( $f =~ qr{\.p[lm]$} ) {
                        $candidate = $f;
                        last;
                    }
                }
            }

            # use our best candidate ( and add our prefix )
            $prefix . '/' . $candidate;
            }
            grep {
            my $key  = $_;
            my $keep = 1;

            # check if there is a distro filter and apply it
            if ( defined $distro && length $distro ) {
                $keep = $key =~ qr{$distro}i ? 1 : 0;
            }
            $keep;
            }
            sort keys %{ $cache->{distros} };
    }

    # now do the pagination
    # page 0: from 0 to limit - 1
    # page 1: from limit to 2 * limit - 1
    # page 2: from 2*limit to 3 * limit - 1

    my @short;
    my $offset = $page * $limit;
    if ( $offset <= scalar @flat_list ) {    # offset protection
        @short = splice( @flat_list, $page * $limit, $limit );
    }

    return \@short;
}

sub _save_cache {
    my ( $self, $cache_file, $cache ) = @_;

    # cache is disabled
    return if $self->config()->{nocache};
    YAML::Syck::DumpFile( $cache_file, $cache );
    my $raw_cache_file = $cache_file . '.raw';
    unlink($raw_cache_file) if -e $raw_cache_file;

    return;
}

sub _get_cache_file {
    my ( $self, $keys, $type ) = @_;

    $type //= q[/search-ls];
    $type .= '-';

    my $cache_file
        = ( $self->cache() // '' )
        . $type
        . md5_hex( join( q{|}, map { defined $_ ? $_ : '' } @$keys ) )
        . '.cache';

    return $cache_file;
}

sub _load_cache {
    my ( $self, $cache_file ) = @_;

    # cache is disabled
    return if $self->config()->{nocache};

    return unless defined $cache_file && -e $cache_file;
    return YAML::Syck::LoadFile($cache_file);
}

sub get_match_cache {
    my ( $self, $search, $search_distro, $query_filetype, $caseinsensitive )
        = @_;

    $caseinsensitive //= 0;

    my $gitdir = $self->git()->work_tree;
    my $limit = $self->config()->{limit}->{files_per_search} or die;

    my $flavor  = _get_git_grep_flavor($search);
    my @git_cmd = qw{grep -l};
    push @git_cmd, q{-i} if $caseinsensitive;
    push @git_cmd, $flavor, '-e', $search, q{--}, q{distros/};

    # use the full cache when available -- need to filter it later
    my $request_cache_file = $self->_get_cache_file(
        [ $search, $search_distro, $query_filetype, $caseinsensitive ] );
    {
        my $load = $self->_load_cache($request_cache_file);
        return $load if $load;
    }

    $search_distro =~ s{::+}{-}g if defined $search_distro;

    # the distro can either come from url or the query with some glob
    if (   defined $search_distro
        && length($search_distro)
        && $search_distro =~ qr{^([0-9a-zA-Z_\*])[0-9a-zA-Z_\*\-]*$} )
    {
        # replace the disros search
        $git_cmd[-1]
            = q{distros/}
            . $1 . '/'
            . $search_distro
            . '/*';    # add a / to do not match some other distro
    }

    # filter on some type files distro + query filetype
    if (   defined $query_filetype
        && length $query_filetype
        && $query_filetype =~ qr{^[0-9\.\-\*_a-zA-Z]+$} )
    {
        # append to the distros search
        $git_cmd[-1] .= '*' . $query_filetype;
    }

    # fallback to a shorter search ( and a different cache )
    my $cache_file = $self->_get_cache_file( [@git_cmd] );
    {
        my $load = $self->_load_cache($cache_file);
        return $load if $load;
    }

    my $raw_cache_file = $cache_file . q{.raw};

    my $raw_limit = $self->config()->{limit}->{files_git_run_bg};

    my $list_files = $self->run_git_cmd_limit(
        cache_file       => $raw_cache_file,
        cmd              => [@git_cmd],     # git command
        limit            => $limit,
        limit_bg_process => $raw_limit,     #files_git_run_bg
                                            #pre_run => sub { chdir($gitdir) }
    );

    # remove the final marker if there
    my $search_in_progress = 1;

    #note "LAST LINE .... " . $list_files->[-1];
    #note " check  ? ", $list_files->[-1] eq END_OF_FILE_MARKER() ? 1 : 0;
    if ( scalar @$list_files && $list_files->[-1] eq END_OF_FILE_MARKER() ) {
        pop @$list_files;
        $search_in_progress = 0;
    }

    my $cache = {
        distros            => {},
        search             => $search,
        search_in_progress => $search_in_progress
    };
    my $match_files = scalar @$list_files;
    $cache->{is_incomplete} = 1 if $match_files >= $raw_limit;

    my $last_distro;
    foreach my $line (@$list_files) {
        my ( $where, $distro, $shortpath ) = massage_filepath($line);
        next unless defined $shortpath;
        $last_distro = $distro;
        my $prefix = join '/', $where, $distro;
        $cache->{distros}->{$distro} //= { files => [], prefix => $prefix };
        push @{ $cache->{distros}->{$distro}->{files} }, $shortpath;
    }

    if ( $cache->{is_incomplete} )
    {    # flag the last distro as potentially incomplete
        $cache->{distros}->{$last_distro}->{'is_incomplete'} = 1;
    }

    $cache->{match} = {
        files   => $match_files,
        distros => scalar keys %{ $cache->{distros} }
    };

    if ( !$search_in_progress ) {

        #note "Search in progress..... done caching yaml file";
        $self->_save_cache( $request_cache_file, $cache );
        $self->_save_cache( $cache_file,         $cache );
        unlink $raw_cache_file if -e $raw_cache_file;
    }

    return $cache;
}

sub massage_filepath {
    my $line = shift;
    my ( $where, $letter, $distro, $shortpath ) = split( q{/}, $line, 4 );
    $where  //= '';
    $letter //= '';
    $where .= '/' . $letter;
    return ( $where, $distro, $shortpath );
}

sub run_git_cmd_limit {
    my ( $self, %opts ) = @_;

    my $cache_file = $opts{cache_file};
    my $cmd        = $opts{cmd} // die;
    ref $cmd eq 'ARRAY' or die "cmd should be an ARRAY ref";
    my $limit            = $opts{limit}            || 10;
    my $limit_bg_process = $opts{limit_bg_process} || $limit;

    my @lines;

    if ( $cache_file && -e $cache_file && !$self->config()->{nocache} ) {

        # check if the file is empty and has more than X seconds

        while ( waitpid( -1, WNOHANG ) > 0 ) {1}; # catch any zombies we could have from previous run

        if ( -z $cache_file ) {                   # the file is empty
            my ( $mtime, $ctime ) = ( stat($cache_file) )[ 9, 10 ];
            $mtime //= 0;
            $ctime //= 0;

            # return an empty cache if the file exists and is empty...
            return [] if ( time() - $mtime < 60 * 30 );

            # give it a second try after some time...
        }
        else {
            # return the content of our current cache from previous run
            #note "use our cache from previous run";
            my @from_cache = File::Slurp::read_file($cache_file);
            chomp @from_cache;
            return \@from_cache;
        }
    }

    local $| = 1;
    local $SIG{'USR1'} = sub {exit}; # avoid a race condition and exit cleanly

    #my $child_pid = open( my $from_kid, "-|" ) // die "Can't fork: $!";

    local $SIG{'CHLD'} = 'DEFAULT';

    my ( $from_kid, $CW ) = ( IO::Handle->new(), IO::Handle->new() );
    pipe( $from_kid, $CW ) or die "Fail to pipe $!";
    $CW->autoflush(1);

    my $child_pid = fork();
    die "Fork failed" unless defined $child_pid;

    local $SIG{'ALRM'} = sub { die "Alarm signal triggered - $$" };

    if ($child_pid) {    # parent process
        my $c = 1;
        alarm( $self->config->{timeout}->{user_search} );
        eval {
            while ( my $line = readline($from_kid) ) {
                chomp $line;
                if ( $c == 1 && $line eq TOO_BUSY_MARKER() ) {
                    return [];
                }
                push @lines, $line;
                last if ++$c > $limit;

                #note "GOT: $line ", $line eq END_OF_FILE_MARKER() ? 1 : 0;
                last if $line eq END_OF_FILE_MARKER();
            }
            alarm(0);
            1;
        };    # or warn $@;
        close($from_kid);
        kill 'USR1' => $child_pid;
        while ( waitpid( -1, WNOHANG ) > 0 ) {1}; # catch what we can at this step... the process is running in bg
    }
    else {
        # in kid process
        local $| = 1;
        my $current_pid       = $$;
        my $can_write_to_pipe = 1;
        local $SIG{'USR1'} = sub {                # not really used anymore
                                                  #warn "SIGUSR1.... start";
            $can_write_to_pipe = 0;
            close($CW);
            open STDIN,  '>', '/dev/null';
            open STDOUT, '>', '/dev/null';
            open STDERR, '>', '/dev/null';
            setsid();

            return;
        };

        #kill 'USR1' => $$; # >>>>
        my $run;

        local $SIG{'ALRM'} = sub {
            warn "alarm triggered while running git command";

            if ( ref $run ) {
                my $pid;
                local $@;
                $pid = eval { $run->pid };
                if ($pid) {
                    warn "killing 'git' process $pid...";
                    if ( kill( 0, $pid ) ) {
                        sleep 2;
                        kill( 9, $pid );
                    }
                }
            }

            die
                "alarm triggered while running git command: git grep too long...";
        };

        # limit our search in time...
        alarm( $self->config->{timeout}->{grep_search} // 600 )
            ;    # make sure we always have a value set
        $opts{pre_run}->() if ref $opts{pre_run} eq 'CODE';

        my $lock = $self->check_if_a_worker_is_available();
        if ( !$lock ) {
            print {$CW} TOO_BUSY_MARKER() . "\n";
            exit 42;
        }

        note "Running in kid command: " . join( ' ', @$cmd );
        note "KID is caching to file ", $cache_file;

        my $to_cache;

        if ($cache_file) {
            $to_cache = IO::Handle->new;
            open( $to_cache, q{>}, $cache_file )
                or die "Cannot open cache file: $!";
            $to_cache->autoflush(1);
        }

        $run = $self->git->command(@$cmd);
        my $log     = $run->stdout;
        my $counter = 1;

        while ( readline $log ) {
            print {$CW} $_
                if $can_write_to_pipe;    # return the line to our parent
            if ($cache_file) {
                print {$to_cache} $_ or die;    # if file is removed
            }
            last if ++$counter > $limit_bg_process;
        }
        $run->close;
        print {$to_cache}
            qq{\n};    # in case of the last line did not had a newline
        print {$to_cache} END_OF_FILE_MARKER() . qq{\n} if $cache_file;
        print {$CW} END_OF_FILE_MARKER() . qq{\n}       if $can_write_to_pipe;
        note "-- Request finished by kid: $counter lines - "
            . join( ' ', @$cmd );
        exit $?;
    }

    return \@lines;
}

sub check_if_a_worker_is_available {
    my ($self) = @_;

    my $maxworkers = $self->config->{maxworkers} || 1;

    my $dir = $self->cache();
    return unless -d $dir;

    foreach my $id ( 1 .. $maxworkers ) {
        my $f = $dir . '/worker-id-' . $id;
        open( my $fh, '>', $f ) or next;
        if ( flock( $fh, LOCK_EX | LOCK_NB ) ) {
            seek( $fh, 0, SEEK_END );
            print {$fh} "$$\n";
            return $fh;
        }

    }

    return;
}

1;
