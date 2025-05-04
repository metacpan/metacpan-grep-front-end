package main;

BEGIN {
    use FindBin;
    unshift @INC, $FindBin::Bin . "/lib";
}

use Test::Grep::MetaCPAN;

package grepcpan;
use Dancer2;

package main;
use strict;
use warnings;

use Test2::Bundle::Extended;
use Test2::Tools::Explain;
use Test2::Plugin::NoWarnings;

use grepcpan;

my $config = grepcpan::config()->{'grepcpan'};

#note explain $config;

like $config, hash {

    #field binaries => like
    field demo       => 0;
    field nocache    => 0;
    field maxworkers => match(qr/^[0-9]+$/);

    field binaries => hash {
        field git => D();
    };

    field cache => hash {
        field directory => match(qr{^[~a-z\./]+$}i);
        field version   => match(qr/^[0-9]+\.[0-9]+$/);
    };

    field cookie => hash {
        field history_name => 'lastsearch';
        field history_size => match(qr/^[0-9]+$/);
    };

}, 'config looks sane';

done_testing;
