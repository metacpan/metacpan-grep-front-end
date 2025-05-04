package GrepCpan::std;

use strict;
use warnings;

sub import {

    # auto import strict and warnings to our caller

    warnings->import();
    strict->import();

    require feature;
    feature->import( ':5.30', 'signatures' );
    warnings->unimport('experimental::signatures');

    return;
}

1;
