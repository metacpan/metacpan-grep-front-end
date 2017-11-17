use strict;
use warnings;
use ExtUtils::MakeMaker;

# Normalize version strings like 6.30_02 to 6.3002,
# so that we can do numerical comparisons on it.
my $eumm_version = $ExtUtils::MakeMaker::VERSION;
$eumm_version =~ s/_//;

WriteMakefile(
    NAME         => 'grepcpan',
    AUTHOR       => q{Nicolas R. <atoomic@cpan.org>},
    VERSION_FROM => 'lib/grepcpan.pm',
    ABSTRACT     => 'grep metacpan web frontend',
    (
        $eumm_version >= 6.3001
        ? ( 'LICENSE' => 'perl' )
        : ()
    ),
    PL_FILES  => {},
    PREREQ_PM => {
        'Test::More'                  => 0,
        'YAML'                        => 0,
        'Dancer2'                     => 0.205000,
        "Git::Repository"             => 0,
        "Proc::ProcessTable"          => 0,
        "Digest::MD5"                 => 0,
        "YAML::Syck"                  => 0,
        "Simple::Accessor"            => "1.02",
        "Time::HiRes"                 => 0,
        "Test::Harness"               => 0,
        "Dancer2"                     => "0",
        "Template"                    => 0,
        "JSON::XS"                    => 0,
        "Plack"                       => 0,
        "Plack::Middleware"           => 0,
        "Plack::Middleware::Deflater" => 0,
        "Plack::Handler::Starman"     => 0,
        "File::Slurp"                 => 0,
        "Fcntl"                       => 0,
        "FindBin"                     => 0,
        "Cpanel::JSON::XS"            => 0,
        "JSON::MaybeXS"               => 0,
        "HTTP::Entity::Parser"        => 0,
        "YAML"                        => 0,
        "URL::Encode::XS"             => 0,
        "CGI::Deurl::XS"              => 0,
        "HTTP::Parser::XS"            => 0,
    },
    dist  => { COMPRESS => 'gzip -9f', SUFFIX => 'gz', },
    clean => { FILES    => 'grepcpan-*' },
);
