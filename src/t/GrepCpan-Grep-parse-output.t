use v5.036;

use strict;
use warnings;

use Test2::V0;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep;

# Simulate git grep --heading -n -C output for testing _parse_git_grep_output.
# The function is a plain sub (not a method) that takes ($matches, $cache).

# Helper: build a minimal cache with distro entries
sub make_cache {
    my @distro_names = @_;
    return {
        distros => {
            map { $_ => { files => [], prefix => "distros/" . substr($_, 0, 1) . "/$_" } }
            @distro_names
        },
    };
}

subtest 'single file, single block' => sub {
    my $cache = make_cache('Acme-Test');
    my @lines = (
        'distros/A/Acme-Test/lib/Acme/Test.pm',
        '10:use strict;',
        '11-use warnings;',
    );

    my $output = GrepCpan::Grep::_parse_git_grep_output(\@lines, $cache);

    is scalar @$output, 1, 'one distro in output';
    is scalar @{$output->[0]{matches}}, 1, 'one match entry';
    is $output->[0]{matches}[0]{file}, 'lib/Acme/Test.pm', 'correct file path';
    is scalar @{$output->[0]{matches}[0]{blocks}}, 1, 'one block';
    is $output->[0]{matches}[0]{blocks}[0]{start_at}, 10, 'block starts at line 10';
    is $output->[0]{matches}[0]{blocks}[0]{matchlines}, [10], 'line 10 is a match';
};

subtest 'single file, multiple blocks — blocks merged under one file entry' => sub {
    my $cache = make_cache('Acme-Test');
    my @lines = (
        'distros/A/Acme-Test/lib/Acme/Test.pm',
        '5:first match',
        '6-context after first',
        '--',
        '20:second match',
        '21-context after second',
    );

    my $output = GrepCpan::Grep::_parse_git_grep_output(\@lines, $cache);

    is scalar @$output, 1, 'one distro in output';
    is scalar @{$output->[0]{matches}}, 1, 'one match entry (not duplicated)';
    is $output->[0]{matches}[0]{file}, 'lib/Acme/Test.pm', 'correct file';
    is scalar @{$output->[0]{matches}[0]{blocks}}, 2, 'two blocks under same file';

    is $output->[0]{matches}[0]{blocks}[0]{start_at}, 5, 'first block starts at 5';
    is $output->[0]{matches}[0]{blocks}[0]{matchlines}, [5], 'first block match line';

    is $output->[0]{matches}[0]{blocks}[1]{start_at}, 20, 'second block starts at 20';
    is $output->[0]{matches}[0]{blocks}[1]{matchlines}, [20], 'second block match line';
};

subtest 'two files from different distros' => sub {
    my $cache = make_cache('Acme-Foo', 'Bar-Baz');
    my @lines = (
        'distros/A/Acme-Foo/lib/Foo.pm',
        '3:match in foo',
        '--',
        'distros/B/Bar-Baz/lib/Bar.pm',
        '7:match in bar',
    );

    my $output = GrepCpan::Grep::_parse_git_grep_output(\@lines, $cache);

    is scalar @$output, 2, 'two distros in output';
    is $output->[0]{distro}, 'Acme-Foo', 'first distro';
    is $output->[1]{distro}, 'Bar-Baz', 'second distro';
    is scalar @{$output->[0]{matches}}, 1, 'one match for first distro';
    is scalar @{$output->[1]{matches}}, 1, 'one match for second distro';
};

subtest 'three blocks in same file' => sub {
    my $cache = make_cache('Acme-Test');
    my @lines = (
        'distros/A/Acme-Test/lib/Acme/Test.pm',
        '1:first',
        '--',
        '50:second',
        '--',
        '100:third',
    );

    my $output = GrepCpan::Grep::_parse_git_grep_output(\@lines, $cache);

    is scalar @{$output->[0]{matches}}, 1, 'single match entry';
    is scalar @{$output->[0]{matches}[0]{blocks}}, 3, 'three blocks';
    is $output->[0]{matches}[0]{blocks}[0]{start_at}, 1, 'block 1';
    is $output->[0]{matches}[0]{blocks}[1]{start_at}, 50, 'block 2';
    is $output->[0]{matches}[0]{blocks}[2]{start_at}, 100, 'block 3';
};

subtest 'multi-block file followed by another file' => sub {
    my $cache = make_cache('Acme-Foo', 'Bar-Baz');
    my @lines = (
        'distros/A/Acme-Foo/lib/Foo.pm',
        '5:match one',
        '--',
        '30:match two',
        '--',
        'distros/B/Bar-Baz/lib/Bar.pm',
        '10:match in bar',
    );

    my $output = GrepCpan::Grep::_parse_git_grep_output(\@lines, $cache);

    is scalar @$output, 2, 'two distros';
    is scalar @{$output->[0]{matches}[0]{blocks}}, 2, 'first file has 2 blocks';
    is scalar @{$output->[1]{matches}[0]{blocks}}, 1, 'second file has 1 block';
};

subtest 'context lines are not counted as matches' => sub {
    my $cache = make_cache('Acme-Test');
    my @lines = (
        'distros/A/Acme-Test/lib/Test.pm',
        '8-context before',
        '9-context before',
        '10:the actual match',
        '11-context after',
        '12-context after',
    );

    my $output = GrepCpan::Grep::_parse_git_grep_output(\@lines, $cache);

    my $block = $output->[0]{matches}[0]{blocks}[0];
    is $block->{matchlines}, [10], 'only line 10 is a match';
    is $block->{start_at}, 8, 'block starts at context line 8';
};

subtest 'empty input' => sub {
    my $cache = make_cache();
    my $output = GrepCpan::Grep::_parse_git_grep_output(undef, $cache);
    is $output, [], 'undef matches returns empty output';
};

subtest 'long line truncation' => sub {
    my $cache = make_cache('Acme-Test');
    my $long = 'x' x 300;
    my @lines = (
        'distros/A/Acme-Test/lib/Test.pm',
        "5:$long",
    );

    my $output = GrepCpan::Grep::_parse_git_grep_output(\@lines, $cache);

    my $code = $output->[0]{matches}[0]{blocks}[0]{code};
    chomp $code;
    ok length($code) <= 254, 'line truncated to ~250 chars + ...';
    like $code, qr/\.\.\.$/, 'ends with ellipsis';
};

done_testing;
