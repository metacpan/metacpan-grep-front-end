use strict;
use warnings;
use ExtUtils::MakeMaker;

# Normalize version strings like 6.30_02 to 6.3002,
# so that we can do numerical comparisons on it.
my $eumm_version = $ExtUtils::MakeMaker::VERSION;
$eumm_version =~ s/_//;

WriteMakefile(
    NAME             => 'grepcpan',
    AUTHOR           => q{Nicolas R. <atoomic@cpan.org>},
    VERSION_FROM     => 'lib/grepcpan.pm',
    ABSTRACT         => 'grep metacpan web frontend',
    MIN_PERL_VERSION => 5.036,
    (
        $eumm_version >= 6.3001
        ? ( 'LICENSE' => 'perl' )
        : ()
    ),
    PL_FILES  => {},
    PREREQ_PM => {
        'App::cpanminus' => 0,    # for travisci so we can use cpanfile
        'Test::More'     => 0,
    },

    dist  => { COMPRESS => 'gzip -9f', SUFFIX => 'gz', },
    clean => { FILES    => 'grepcpan-*' },
);

