use strict;
use warnings;

use Test2::Bundle::Extended;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use GrepCpan::Grep::Zoekt;

# basic fixed string
is GrepCpan::Grep::Zoekt::build_query(
    search => 'perlimports',
), 'perlimports', 'simple fixed string';

# regex search
is GrepCpan::Grep::Zoekt::build_query(
    search => '[a-z]est',
    flavor => '-P',
), 'regex:[a-z]est', 'regex query';

# case insensitive
is GrepCpan::Grep::Zoekt::build_query(
    search          => 'test',
    caseinsensitive => 1,
), 'test case:no', 'case insensitive';

# distro filter
is GrepCpan::Grep::Zoekt::build_query(
    search         => 'import',
    search_distro  => 'App-perlimports',
), 'import file:distros/.*/App-perlimports/', 'distro filter';

# filetype filter
is GrepCpan::Grep::Zoekt::build_query(
    search    => 'test',
    filetypes => ['.pm', '.pl'],
), 'test (file:\.pm$ or file:\.pl$)', 'filetype filter';

# ignore files
is GrepCpan::Grep::Zoekt::build_query(
    search       => 'test',
    ignore_files => ['*.md', '*.json'],
), 'test -file:\.md$ -file:\.json$', 'ignore files';

# combined
is GrepCpan::Grep::Zoekt::build_query(
    search          => 'use strict',
    caseinsensitive => 1,
    search_distro   => 'Moose',
    filetypes       => ['.pm'],
    ignore_files    => ['*.t'],
), 'use strict case:no file:distros/.*/Moose/ file:\.pm$ -file:\.t$', 'combined query';

done_testing;
