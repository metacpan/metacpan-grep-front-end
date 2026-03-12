#!/usr/bin/env perl

use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/../lib";

use grepcpan;
use Plack::Builder;

builder {
    enable 'Deflater';
    grepcpan->to_app;
}
