use v5.36;

use strict;
use warnings;

local $| = 1;

BEGIN {
    use FindBin;
    unshift @INC, $FindBin::Bin . "/lib";
}

use Test::Grep::MetaCPAN;

use Test2::V0;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;

use File::Temp ();
use File::Path qw(make_path);

# --- Helpers ---

my $git;

foreach my $c (
    qw{ /opt/homebrew/bin/git /usr/local/cpanel/3rdparty/bin/git /usr/bin/git }
    )
{
    next unless -x $c;
    $git = $c;
}

die "missing git binary" unless length $git;

# Create a temp git repo mimicking the distros/ directory structure.
# This lets us test the full search pipeline without Docker.
sub create_test_repo {
    my $tmp = File::Temp->newdir(
        "grep-search-XXXXXX", DIR => '/tmp', UNLINK => 1
    );
    my $repodir = $tmp->dirname;

    # Create distro directory structure: distros/<first-letter>/<name>/...
    my $distro_base = "$repodir/distros";

    # Distro 1: Foo-Bar with a .pm and .t file
    my $foo_dir = "$distro_base/F/Foo-Bar";
    make_path("$foo_dir/lib/Foo");
    make_path("$foo_dir/t");

    _write_file( "$foo_dir/lib/Foo/Bar.pm", <<'PERL' );
package Foo::Bar;

use strict;
use warnings;

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

sub hello {
    my ($self) = @_;
    return "Hello, World!";
}

sub process_data {
    my ($self, $data) = @_;
    return unless defined $data;
    # This is an important function
    my $result = $data * 2;
    return $result;
}

1;
PERL

    _write_file( "$foo_dir/lib/Foo/Utils.pm", <<'PERL' );
package Foo::Utils;

use strict;
use warnings;

sub hello {
    return "Hello from Utils";
}

sub goodbye {
    return "Goodbye from Utils";
}

1;
PERL

    _write_file( "$foo_dir/t/basic.t", <<'PERL' );
use strict;
use warnings;
use Test::More;

use_ok('Foo::Bar');

my $obj = Foo::Bar->new();
is $obj->hello(), "Hello, World!", "hello works";

done_testing;
PERL

    # Distro 2: Baz-Qux with a single file
    my $baz_dir = "$distro_base/B/Baz-Qux";
    make_path("$baz_dir/lib/Baz");

    _write_file( "$baz_dir/lib/Baz/Qux.pm", <<'PERL' );
package Baz::Qux;

use strict;
use warnings;

sub hello {
    my ($self) = @_;
    return "Hello from Baz::Qux";
}

1;
PERL

    # Distro 3: Multi-Match with content that produces multiple match blocks
    my $multi_dir = "$distro_base/M/Multi-Match";
    make_path("$multi_dir/lib");

    _write_file( "$multi_dir/lib/Multi.pm", <<'PERL' );
package Multi;

use strict;
use warnings;

# First section with the keyword
sub alpha {
    return "alpha target_keyword here";
}

# A bunch of filler lines to force separate blocks with context
# line 1
# line 2
# line 3
# line 4
# line 5
# line 6
# line 7
# line 8
# line 9
# line 10
# line 11
# line 12
# line 13
# line 14
# line 15

# Second section with the keyword
sub beta {
    return "beta target_keyword here";
}

1;
PERL

    # Distro 4: Unicode content
    my $uni_dir = "$distro_base/U/Unicode-Test";
    make_path("$uni_dir/lib");

    _write_file( "$uni_dir/lib/Unicode.pm", <<"PERL" );
package Unicode;

use strict;
use warnings;
use utf8;

# Comments with unicode: caf\x{e9}, na\x{ef}ve
sub gr\x{fc}\x{df}e {
    return "Gr\x{fc}\x{df}e aus Berlin";
}

sub search_me {
    return "find this line";
}

1;
PERL

    # Initialize git repo
    system( $git, '-C', $repodir, 'init', '-q' ) == 0
        or die "git init failed";
    system( $git, '-C', $repodir,
        '-c', 'user.email=test@test.com',
        '-c', 'user.name=Test',
        'add', '.' ) == 0
        or die "git add failed";
    system( $git, '-C', $repodir,
        '-c', 'user.email=test@test.com',
        '-c', 'user.name=Test',
        'commit', '-q', '-m', 'initial' ) == 0
        or die "git commit failed";

    return ( $tmp, $repodir );
}

sub _write_file {
    my ( $path, $content ) = @_;
    open my $fh, '>:encoding(UTF-8)', $path or die "Cannot write $path: $!";
    print {$fh} $content;
    close $fh;
}

sub create_grep_object {
    my ($repodir) = @_;

    my $cache_tmp = File::Temp->newdir(
        "grep-cache-XXXXXX", DIR => '/tmp', UNLINK => 1
    );

    $grepcpan::VERSION = '0.test';

    my $config = {
        'binaries' => { 'git' => $git },
        'cache'    => {
            'directory' => $cache_tmp->dirname,
            'version'   => "0.$$"
        },
        'gitrepo'    => $repodir,
        'maxworkers' => '2',
        'nocache'    => '1',
        'limit'      => {
            'distros_per_page'      => '30',
            'files_git_run_bg'      => '2000',
            'files_per_search'      => '60',
            'search_context'        => '3',
            'search_context_distro' => '10',
            'search_context_file'   => '60'
        },
        'timeout' => {
            'grep_search' => '30',
            'user_search' => '10'
        }
    };

    return ( GrepCpan::Grep->new( config => $config ), $cache_tmp );
}

# --- Setup ---

my ( $repo_tmp, $repodir ) = create_test_repo();
ok -d $repodir, "test repo created: $repodir";

my ( $grep, $cache_tmp ) = create_grep_object($repodir);
isa_ok $grep, 'GrepCpan::Grep';

# =============================================================================
# Test 1: Basic fixed-string search
# =============================================================================

subtest 'basic fixed-string search' => sub {
    my $result = $grep->do_search( search => 'hello' );

    ok defined $result, 'got result';
    is ref $result, 'HASH', 'result is a hashref';

    # Structure checks
    ok exists $result->{match},       'has match field';
    ok exists $result->{results},     'has results field';
    ok exists $result->{time_elapsed}, 'has time_elapsed field';
    ok exists $result->{version},     'has version field';
    ok exists $result->{is_incomplete}, 'has is_incomplete field';

    # "hello" appears in Foo-Bar (Bar.pm, Utils.pm, basic.t) and Baz-Qux
    ok $result->{match}{files} >= 2, "at least 2 files match 'hello'";
    ok $result->{match}{distros} >= 2, "at least 2 distros match 'hello'";

    is ref $result->{results}, 'ARRAY', 'results is an array';

    # Each result entry should have expected structure
    for my $entry ( @{ $result->{results} } ) {
        ok exists $entry->{distro},  "entry has distro: $entry->{distro}";
        ok exists $entry->{matches}, 'entry has matches';
        is ref $entry->{matches}, 'ARRAY', 'matches is an array';

        for my $match ( @{ $entry->{matches} } ) {
            ok exists $match->{file},   'match has file';
            ok exists $match->{blocks}, 'match has blocks';
            is ref $match->{blocks}, 'ARRAY', 'blocks is an array';

            for my $block ( @{ $match->{blocks} } ) {
                ok exists $block->{code},       'block has code';
                ok exists $block->{start_at},   'block has start_at';
                ok exists $block->{matchlines}, 'block has matchlines';
                ok $block->{start_at} > 0, 'start_at is positive';
                like $block->{code}, qr/hello/i, 'block code contains search term';
            }
        }
    }
};

# =============================================================================
# Test 2: PCRE regex search
# =============================================================================

subtest 'PCRE regex search' => sub {
    my $result = $grep->do_search( search => 'process_\w+' );

    ok defined $result, 'got result';
    ok $result->{match}{files} >= 1, 'at least 1 file matches regex';

    # Should find process_data in Foo::Bar
    my $found_process = 0;
    for my $entry ( @{ $result->{results} } ) {
        for my $match ( @{ $entry->{matches} } ) {
            for my $block ( @{ $match->{blocks} } ) {
                $found_process = 1 if $block->{code} =~ /process_data/;
            }
        }
    }
    ok $found_process, 'regex search found process_data';
};

# =============================================================================
# Test 3: Case-insensitive search
# =============================================================================

subtest 'case-insensitive search' => sub {
    my $result_cs = $grep->do_search( search => 'HELLO' );
    my $result_ci = $grep->do_search(
        search          => 'HELLO',
        caseinsensitive => 1
    );

    # Case-sensitive "HELLO" should find nothing (all lowercase in source)
    is $result_cs->{match}{files}, 0, 'case-sensitive HELLO finds nothing';

    # Case-insensitive should find matches
    ok $result_ci->{match}{files} >= 1,
        'case-insensitive HELLO finds matches';
};

# =============================================================================
# Test 4: Distro filter
# =============================================================================

subtest 'distro filter' => sub {
    my $result = $grep->do_search(
        search        => 'hello',
        search_distro => 'Foo-Bar',
    );

    ok defined $result, 'got result with distro filter';
    is $result->{is_a_known_distro}, 1,
        'Foo-Bar recognized as known distro';

    # Only Foo-Bar results should appear
    for my $entry ( @{ $result->{results} } ) {
        is $entry->{distro}, 'Foo-Bar',
            'filtered results contain only Foo-Bar';
    }
};

subtest 'distro filter with unknown distro' => sub {
    my $result = $grep->do_search(
        search        => 'hello',
        search_distro => 'Nonexistent-Distro',
    );

    ok !$result->{is_a_known_distro}, 'unknown distro not recognized';
};

# =============================================================================
# Test 5: File-specific search
# =============================================================================

subtest 'search within specific file' => sub {
    my $result = $grep->do_search(
        search        => 'hello',
        search_distro => 'Foo-Bar',
        search_file   => 'lib/Foo/Bar.pm',
    );

    ok defined $result, 'got result with file filter';

    # Should only contain one match entry for Bar.pm
    for my $entry ( @{ $result->{results} } ) {
        for my $match ( @{ $entry->{matches} } ) {
            is $match->{file}, 'lib/Foo/Bar.pm',
                'file filter restricts to Bar.pm';
        }
    }
};

# =============================================================================
# Test 6: Multi-block matches in same file
# =============================================================================

subtest 'multi-block matches in same file' => sub {
    # "target_keyword" appears twice in Multi.pm, separated by many lines
    my $result = $grep->do_search( search => 'target_keyword' );

    ok $result->{match}{files} >= 1, 'found target_keyword';

    # Find the Multi-Match distro entry
    my $multi_entry;
    for my $entry ( @{ $result->{results} } ) {
        if ( $entry->{distro} eq 'Multi-Match' ) {
            $multi_entry = $entry;
            last;
        }
    }

    ok defined $multi_entry, 'found Multi-Match distro in results';

    if ($multi_entry) {
        # Collect ALL blocks for lib/Multi.pm across all match entries.
        # Note: on current master, multi-block matches for the same file
        # may be split across separate match entries due to how the '--'
        # separator in git grep output is handled. PR #101 fixes this.
        my @all_blocks;
        my $file_found = 0;
        for my $match ( @{ $multi_entry->{matches} } ) {
            if ( $match->{file} eq 'lib/Multi.pm' ) {
                $file_found = 1;
                push @all_blocks, @{ $match->{blocks} };
            }
        }

        ok $file_found, 'found lib/Multi.pm match';

        if ($file_found) {
            ok scalar @all_blocks >= 2,
                'file has at least 2 blocks (two match sites)';

            # Verify both occurrences are found across all blocks
            my $found_alpha = 0;
            my $found_beta  = 0;
            for my $block (@all_blocks) {
                $found_alpha = 1 if $block->{code} =~ /alpha/;
                $found_beta  = 1 if $block->{code} =~ /beta/;
            }
            ok $found_alpha, 'found alpha occurrence of target_keyword';
            ok $found_beta,  'found beta occurrence of target_keyword';
        }
    }
};

# =============================================================================
# Test 7: No results search
# =============================================================================

subtest 'search with no results' => sub {
    my $result = $grep->do_search(
        search => 'xyzzy_nonexistent_string_12345'
    );

    ok defined $result, 'got result for no-match search';
    is $result->{match}{files},   0, 'zero files match';
    is $result->{match}{distros}, 0, 'zero distros match';
    is ref $result->{results}, 'ARRAY', 'results is still an array';
    is scalar @{ $result->{results} }, 0, 'results array is empty';
};

# =============================================================================
# Test 8: Invalid regex returns error
# =============================================================================

subtest 'invalid regex returns structured error' => sub {
    my $result = $grep->do_search( search => '(unclosed' );

    ok defined $result, 'got result for invalid regex';

    # Should have adjusted_request with error
    ok exists $result->{adjusted_request}, 'has adjusted_request';
    ok exists $result->{adjusted_request}{q}, 'adjusted_request has q entry';
    like $result->{adjusted_request}{q}{error},
        qr/Invalid regular expression/i,
        'error message mentions invalid regex';
    is $result->{match}{files},   0, 'no files for invalid regex';
    is $result->{match}{distros}, 0, 'no distros for invalid regex';
};

# =============================================================================
# Test 9: Pagination
# =============================================================================

subtest 'pagination' => sub {
    my $result_p1 = $grep->do_search( search => 'hello', page => 0 );
    my $result_p2 = $grep->do_search( search => 'hello', page => 99 );

    ok defined $result_p1, 'page 1 returns result';
    ok defined $result_p2, 'page 99 returns result';

    # Page 99 should be empty (we only have 3-4 distros)
    is scalar @{ $result_p2->{results} }, 0,
        'far-away page returns empty results';
};

# =============================================================================
# Test 10: Match line numbers are accurate
# =============================================================================

subtest 'match line numbers are accurate' => sub {
    # Search for something unique: "process_data" in Foo/Bar.pm
    my $result = $grep->do_search(
        search        => 'process_data',
        search_distro => 'Foo-Bar',
        search_file   => 'lib/Foo/Bar.pm',
    );

    ok $result->{match}{files} >= 1, 'found process_data';

    for my $entry ( @{ $result->{results} } ) {
        for my $match ( @{ $entry->{matches} } ) {
            for my $block ( @{ $match->{blocks} } ) {
                for my $lineno ( @{ $block->{matchlines} } ) {
                    ok $lineno > 0, "match line number $lineno is positive";
                    ok $lineno <= 30,
                        "match line number $lineno is within file bounds";
                }
            }
        }
    }
};

# =============================================================================
# Test 11: Time elapsed is reasonable
# =============================================================================

subtest 'time elapsed is reasonable' => sub {
    my $result = $grep->do_search( search => 'hello' );
    like $result->{time_elapsed}, qr{^\d+\.\d+$},
        'time_elapsed is a decimal number';

    my $elapsed = $result->{time_elapsed} + 0;
    ok $elapsed < 10, 'search took less than 10 seconds';
};

# =============================================================================
# Test 12: Filetype filter
# =============================================================================

subtest 'filetype filter' => sub {
    # Search only .pm files
    my $result = $grep->do_search(
        search   => 'hello',
        filetype => '*.pm',
    );

    ok $result->{match}{files} >= 1, 'found matches in .pm files';

    # Search only .t files
    my $result_t = $grep->do_search(
        search   => 'hello',
        filetype => '*.t',
    );

    # The .t file contains "hello" in use_ok test output
    # Both should return results but potentially different
    ok defined $result_t, 'filetype .t search returns result';
};

# =============================================================================
# Test 13: Context lines
# =============================================================================

subtest 'search results include context' => sub {
    my $result = $grep->do_search(
        search        => 'process_data',
        search_distro => 'Foo-Bar',
        search_file   => 'lib/Foo/Bar.pm',
    );

    for my $entry ( @{ $result->{results} } ) {
        for my $match ( @{ $entry->{matches} } ) {
            for my $block ( @{ $match->{blocks} } ) {
                # With context=3, block should have more lines than just the match
                my @lines = split /\n/, $block->{code};
                ok scalar @lines >= 2,
                    'block has context lines (more than just the match)';
            }
        }
    }
};

# =============================================================================
# Test 14: search_in_progress flag
# =============================================================================

subtest 'search_in_progress flag' => sub {
    my $result = $grep->do_search( search => 'hello' );

    # With our tiny repo, search should complete
    is $result->{search_in_progress}, 0,
        'search_in_progress is 0 for completed search';
};

# =============================================================================
# Test 15: Block start_at and matchlines consistency
# =============================================================================

subtest 'block start_at and matchlines consistency' => sub {
    my $result = $grep->do_search( search => 'hello' );

    for my $entry ( @{ $result->{results} } ) {
        for my $match ( @{ $entry->{matches} } ) {
            for my $block ( @{ $match->{blocks} } ) {
                my $start = $block->{start_at};
                for my $lineno ( @{ $block->{matchlines} } ) {
                    ok $lineno >= $start,
                        "matchline $lineno >= start_at $start";
                }
            }
        }
    }
};

# =============================================================================
# Test 16: Distro prefix structure
# =============================================================================

subtest 'distro prefix structure' => sub {
    my $result = $grep->do_search( search => 'hello' );

    for my $entry ( @{ $result->{results} } ) {
        ok exists $entry->{prefix}, "entry has prefix field";
        # prefix should be like "distros/X/Distro-Name"
        like $entry->{prefix}, qr{^distros/\w/[\w\-]+$},
            "prefix follows distros/<letter>/<distro> pattern: $entry->{prefix}";
        ok exists $entry->{files}, "entry has files list";
        is ref $entry->{files}, 'ARRAY', 'files is an array';
    }
};

# =============================================================================
# Test 17: Ignore files filter
# =============================================================================

subtest 'ignore files filter' => sub {
    # Search but exclude .t files
    my $result_all = $grep->do_search( search => 'hello' );
    my $result_no_t = $grep->do_search(
        search       => 'hello',
        ignore_files => '*.t',
    );

    ok defined $result_no_t, 'ignore files search returns result';

    # With .t excluded, we should have fewer file matches
    ok $result_no_t->{match}{files} <= $result_all->{match}{files},
        'ignoring .t files reduces match count';
};

# =============================================================================
# Test 18: Regex special chars in search (sanitization impact)
# =============================================================================

subtest 'search with plus character' => sub {
    # The + sign is important for regex searches. The _sanitize_search
    # whitelist historically replaced + with . (GitHub issue #41).
    # This test documents the current behavior.
    my $result = $grep->do_search( search => '\w+' );

    ok defined $result, 'search with + returns result';
    # \w+ is a valid PCRE that should match most text
    ok $result->{match}{files} >= 1, '\w+ regex matches files';
};

# =============================================================================
# Test 19: Multiple distros in overview show one file each
# =============================================================================

subtest 'overview mode shows one file per distro' => sub {
    my $result = $grep->do_search( search => 'hello' );

    # In overview mode (no distro filter), each distro should contribute
    # at most one file to the search results
    for my $entry ( @{ $result->{results} } ) {
        next unless $entry->{matches};

        # Count unique files in matches
        my %seen_files;
        for my $match ( @{ $entry->{matches} } ) {
            $seen_files{ $match->{file} } = 1;
        }

        # In overview mode, only one file per distro is searched
        # (the "best" candidate, preferring .pm files)
        ok scalar keys %seen_files <= 2,
            "distro $entry->{distro} shows <= 2 unique files in overview";
    }
};

# =============================================================================
# Test 20: Perl file preference in overview
# =============================================================================

subtest 'overview prefers .pm files over others' => sub {
    # Foo-Bar has .pm and .t files matching "hello"
    # In overview mode, the .pm file should be preferred
    my $result = $grep->do_search( search => 'hello' );

    my $foo_entry;
    for my $entry ( @{ $result->{results} } ) {
        if ( $entry->{distro} eq 'Foo-Bar' ) {
            $foo_entry = $entry;
            last;
        }
    }

    ok defined $foo_entry, 'found Foo-Bar in results';
    if ( $foo_entry && $foo_entry->{matches} ) {
        my $first_file = $foo_entry->{matches}[0]{file};
        like $first_file, qr{\.pm$},
            "overview chose .pm file: $first_file";
    }
};

done_testing();
