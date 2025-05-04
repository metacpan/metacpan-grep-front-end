package Test::Grep::MetaCPAN;

use strict;
use warnings;

use Test::More;

sub import {

    if ( $ENV{PLACK_ENV} ) {
        note "PLACK_ENV is already defined to: ", $ENV{PLACK_ENV};
    }
    else {
        $ENV{PLACK_ENV} = 'unit-tests';
        note "Set PLACK_ENV=", $ENV{PLACK_ENV}, " for testing";
    }

    return;
}

1;
