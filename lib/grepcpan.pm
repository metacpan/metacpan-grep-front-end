package grepcpan;

use Dancer2;
use Dancer2::Serializer::JSON;

our $VERSION = '0.1';

my $GrepCpanConfig = config()->{'grepcpan'};
my $grep = GrepCpan->new( config => $GrepCpanConfig );

my $COOKIE_LAST_SEARCH = $GrepCpanConfig->{'cookie'}->{'history_name'}
  or die "missing cookie:history entry";

###
### regular routes
###

get '/'      => \&home;
get '/about' => \&home;
get '/faq'   => \&home;

get '/search' => sub {

    my $q     = param('q');                           # FIXME clean query
    my $page  = param('p') || 1;
    my $query = $grep->do_search( $q, $page - 1 );    # list of match

    return template 'search' => {
        'title'       => 'grepcpan',
        search        => $q,
        query         => $query,
        page          => $page,
        last_searches => _update_history_cookie($q),
        show_sumup    => 1
    };
};

get '/search/:distro/' => sub {
    my $q      = param('q');        # FIXME clean query
    my $page   = param('p') || 1;
    my $distro = param('distro');
    my $file   = param('f');
    my $query =
      $grep->do_search( $q, $page - 1, $distro, $file );    # list of match

    my $nopagination = defined $file   && length $file   ? 1 : 0;
    my $show_sumup   = defined $distro && length $distro ? 0 : 1;

    return template 'search' => {
        'title'       => 'grepcpan',
        search        => $q,
        search_distro => $distro,
        query         => $query,
        page          => $page,
        last_searches => _update_history_cookie($q),
        nopagination  => $nopagination,
        show_sumup    => $show_sumup
    };
};

### API routes
get '/api/search' => sub {

    my $q     = param('q');                           # FIXME clean query
    my $page  = param('p') || 1;
    my $query = $grep->do_search( $q, $page - 1 );    # list of match

    content_type 'application/json';
    return to_json $query;
};

get '/api/search/:distro/' => sub {
    my $q      = param('q');                          # FIXME clean query
    my $page   = param('p') || 1;
    my $distro = param('distro');
    my $file   = param('f');
    my $query =
      $grep->do_search( $q, $page - 1, $distro, $file );    # list of match

    content_type 'application/json';
    return to_json $query;
};

###
### dummies helpers
###

sub _update_history_cookie { # and return the human version list in all cases...
    my $search = shift;

    my $separator = q{||};

    my $value = cookie($COOKIE_LAST_SEARCH);

    my @last_searches = split( qr{\Q$separator\E}, $value // '' );

    if ( defined $search && length $search ) {
        $value =~ s{\Q$separator\E}{.}g;    # mmmm
        @last_searches = grep { $_ ne $search }
          @last_searches;                   # remove it from history if there
        unshift @last_searches, $search;    # move it first
        @last_searches = splice( @last_searches, 0,
            $GrepCpanConfig->{'cookie'}->{'history_size'} );
        cookie $COOKIE_LAST_SEARCH => join( $separator, @last_searches ),
          expires                  => "21 days";
    }

    return \@last_searches;
}

sub tt {
    my ( $template, $params ) = @_;

    if ( ref $params ) {

        #$params->{is_mobile} = 1 if is_mobile_device();
    }

    return template( $template, $params );
}

sub home {
    template( 'index' => { 'title' => 'grepcpan' } );
}

true;

package GrepCpan;

use strict;
use warnings;

use Git::Repository ();

=pod

git grep -l to a file to cache the result ( limit it to 200 files and run it in background after ?? )
use this list for pagination
then do a query for a set of files with context

grepcpan@grep.cpan.me [~/minicpan_grep.git]# time git grep -C15 -n xyz HEAD | head -n 200

=cut

use Simple::Accessor
  qw{ config git cache distros_per_page search_context search_context_file search_context_distro git_binary };
use POSIX ":sys_wait_h";
use Proc::ProcessTable ();
use YAML::Syck         ();
use Test::More;

use Digest::MD5 qw( md5_hex );

use v5.024;

$YAML::Syck::LoadBlessed = 0;
$YAML::Syck::SortKeys    = 1;

sub _build_git {
    my $self = shift;

    my $gitdir = $self->config()->{'gitrepo'};
    die qq{Invalid git directory $gitdir} unless defined $gitdir && -d $gitdir;

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

sub _build_cache {
    my $self = shift;

    # also use HEAD ?? FIXME
    my $dir = $self->config()->{'cache'}->{'directory'} . '/'
      . ( $self->config()->{'cache'}->{'version'} || 0 );
    die unless $dir;
    qx{mkdir -p $dir};    # cleanup
    die unless -d $dir;
    return $dir;
}

## TODO factorize
sub _build_distros_per_page {
    my $self = shift;
    my $v    = $self->config()->{limit}{'distros_per_page'};
    $v or die;
    return int($v);
}

sub _build_search_context {
    my $self = shift;
    my $v    = $self->config()->{limit}{'search_context'};
    $v or die;
    return int($v);
}

sub _build_search_context_distro {
    my $self = shift;
    my $v    = $self->config()->{limit}{'search_context_distro'};
    $v or die;
    return int($v);
}

sub _build_search_context_file {
    my $self = shift;
    my $v    = $self->config()->{limit}{'search_context_file'};
    $v or die;
    return int($v);
}

sub _sanitize_search {
    my $s = shift;
    return undef unless defined $s;
    $s =~ s{\n}{}g;
    $s =~ s{'}{\'}g;

    $s =~ s{[^a-zA-Z0-9\-\.\?\\*\&_'"~!$%^()\[\]\{\}:;<>,/@| ]}{}g
      ;    # whitelist possible characters ?

    return $s;
}

sub _get_git_grep_flavor {
    my $s = shift;

    # regular characters
    return q{--fixed-string} if $s =~ qr{^[a-zA-Z0-9&_'"~:;<>,/| ]+$};
    return q{-P};
}

# idea use git rev-parse HEAD to include it in the cache name

sub do_search {
    my ( $self, $search, $page, $search_distro, $search_file ) = @_;

    my $gitdir = $self->git()->work_tree;

    $search = _sanitize_search($search);

    $page //= 0;
    $page = 0 if $page < 0;
    my $cache = $self->get_match_cache($search);

    my $context = $self->search_context();    # default context
    if ( defined $search_file ) {
        $context = $self->search_context_file();
    }
    elsif ( defined $search_distro ) {
        $context = $self->search_context_distro();
    }

    my $files_to_search =
      $self->get_list_of_files_to_search( $cache, $search, $page,
        $search_distro, $search_file );

    # can also probably simply use Git::Repo there
    my $matches;

    if ( scalar @$files_to_search ) {
        my $flavor = _get_git_grep_flavor($search);

# $matches = run_cmd_limit(
# 	# idea add --fixed-string when it s a regular string
# 	cmd => qq{git grep -n --heading -C $context $flavor '$search' HEAD -- } . join( ' ', $files_to_search->@* ) , # FIXME protect files to search
# 	limit => $context * scalar @$files_to_search * 2,
# 	pre_run => sub { chdir($gitdir) }
# );
        my @out = $self->git->run(
            'grep',   '-n',    '--heading', '-C',
            $context, $flavor, $search,     '--',
            $files_to_search->@*
        );
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
            #note "#### A file #### $current_file => \n", explain \@diffblocks;

        my ( $where, $distro, $shortpath ) = split( q{/}, $current_file, 3 );
        return unless length $shortpath;
        my $prefix = join '/', $where, $distro;

        my $result = $cache->{distros}->{$distro} // {};
        $result->{distro}  //= $distro;
        $result->{matches} //= [];

        #@diffblocks = scalar @diffblocks; # debugging clear the blocks
        push $result->{matches}->@*,
          { file => $shortpath, blocks => [@diffblocks] };
        return
          if scalar @output
          && $output[-1] eq $result;    # same hash do not add it more than once
        push @output, $result;

        #note "Adding a block... for distro $distro file $shortpath";

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

    return {
        is_incomplete => $cache->{is_incomplete} || 0,
        match         => $cache->{match},
        results       => \@output
    };
}

sub get_list_of_files_to_search {
    my ( $self, $cache, $search, $page, $search_distro, $search_file ) = @_;

# try to get one file per distro except if we do not have enough distros matching
# maybe sort the files by distros having the most matches ??

    my @flat_list;    # full flat list before pagination

    # if we have enough distros
    my $limit = $self->distros_per_page;
    if ( defined $search_distro ) {

        # let's pick all the files for this distro
        my $distro = $search_distro;
        return [] unless exists $cache->{distros}->{$distro};
        my $prefix = $cache->{distros}->{$distro}->{prefix};
        @flat_list = map { $prefix . '/' . $_ }
          $cache->{distros}->{$distro}->{files}->@*;    # all the files
        if ( defined $search_file ) {
            @flat_list = grep { $_ eq $prefix . '/' . $search_file }
              @flat_list;    # make sure the file is known and sanitize
        }

        #} elsif ( scalar keys $cache->{distros}->%* > $limit ) {
    }
    else {                   # pick one single file per distro
                             #my @distros =
        @flat_list = map {
            my $distro        = $_;
            my $prefix        = $cache->{distros}->{$distro}->{prefix};
            my $list_of_files = $cache->{distros}->{$distro}->{files};
            my $candidate = $list_of_files->[0];    # only the first file
            if ( scalar $list_of_files->@* > 1 ) {

                # try to find a more perlish file first
                foreach my $f ( $list_of_files->@* ) {
                    if ( $f =~ qr{\.p[lm]$} ) {
                        $candidate = $f;
                        last;
                    }
                }
            }

            # use our best candidate ( and add our prefix )
            $prefix . '/' . $candidate;
          }
          sort keys $cache->{distros}->%*;
    }

#note explain $cache;
# } else {
# 	# let's pick all the files
# 	@flat_list = map {
# 			my $distro = $_;
# 			my $prefix = $cache->{distros}->{$distro}->{prefix};
# 			map { $prefix . '/' . $_ } $cache->{distros}->{$distro}->{files}->@* # all the files
# 		}
# 		sort keys $cache->{distros}->%*;
# }

    # now do the pagination
    # page 0: from 0 to limit - 1
    # page 1: from limit to 2 * limit - 1
    # page 2: from 2*limit to 3 * limit - 1

    #note explain \@flat_list;
    my @short = splice( @flat_list, $page * $limit, $limit );

    #note "SHORT LIST....", explain \@short;
    #note scalar @short;

    return \@short;
}

sub get_match_cache {
    my ( $self, $search ) = @_;

    my $cache_file =
      $self->cache() . '/search-ls-' . md5_hex($search) . '.cache';

    return YAML::Syck::LoadFile($cache_file)
      if -e $cache_file;    # maybe also check the timestamp FIXME

    my $gitdir = $self->git()->work_tree;
    my $limit = $self->config()->{limit}->{files_per_search} or die;

    my $flavor     = _get_git_grep_flavor($search);
    my $list_files = run_cmd_limit(
        cmd     => qq{git grep -l $flavor '$search' distros},
        limit   => $limit,
        pre_run => sub { chdir($gitdir) }
    );

    #$list_files = [ map { s{^HEAD:}{}; $_ } @$list_files ];

    my $cache = { distros => {}, search => $search };
    my $match_files = scalar @$list_files;
    $cache->{is_incomplete} = 1 if $match_files >= $limit;

    my $last_distro;
    foreach my $line (@$list_files) {
        warn $line;
        my ( $where, $distro, $shortpath ) = split( q{/}, $line, 3 );
        next unless defined $shortpath;
        $last_distro = $distro;
        my $prefix = join '/', $where, $distro;
        $cache->{distros}->{$distro} //= { files => [], prefix => $prefix };
        push $cache->{distros}->{$distro}->{files}->@*, $shortpath;
    }

    if ( $cache->{is_incomplete} )
    {    # flag the last distro as potentially incomplete
        $cache->{distros}->{$last_distro}->{'is_incomplete'} = 1;
    }

    $cache->{match} =
      { files => $match_files, distros => scalar keys $cache->{distros}->%* };

    #note explain $cache;
    YAML::Syck::DumpFile( $cache_file, $cache );

=pod

FIXME need to use for the HEADER

match:
  distros: 37
  files: 1000
search: a
=cut

    return $cache;
}

sub run_cmd_limit {
    my (%opts) = @_;

    my $cmd = $opts{cmd} // die;
    my $limit = $opts{limit} || 10;

    my @lines;

    local $| = 1;
    local $SIG{'USR1'} = sub { exit }; # avoid a race condition and exit cleanly

    my $child_pid = open( my $from_kid, "-|" ) // die "Can't fork: $!";
    if ($child_pid) {                  # parent process
        my $c = 1;
        while ( my $line = readline($from_kid) ) {
            chomp $line;
            push @lines, $line;
            last if ++$c > $limit;
        }
        kill 'USR1', $child_pid;
        while ( waitpid( -1, WNOHANG ) > 0 ) { 1 }    # also catch zombies
    }
    else {                                            # in kid process
        my $current_pid = $$;
        local $SIG{'USR1'} = sub {
            my $proc_table = Proc::ProcessTable->new();
            foreach my $proc ( @{ $proc_table->table() } ) {
                kill( 15, $proc->pid ) if $proc->ppid == $current_pid;
            }
            return;
        };
        $opts{pre_run}->() if ref $opts{pre_run} eq 'CODE';
        warn "..... Running: " . $cmd;
        system($cmd );
        exit $?;
    }

    return \@lines;
}

1;
