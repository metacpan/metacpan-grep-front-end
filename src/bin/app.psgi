#!/usr/bin/env perl

use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/../lib";


# use this block if you don't need middleware, and only have a single target Dancer app to run here
use grepcpan;

grepcpan->to_app;

use Plack::Builder;

builder {
    enable 'Deflater';
    grepcpan->to_app;
}



=begin comment
# use this block if you want to include middleware such as Plack::Middleware::Deflater

use grepcpan;
use Plack::Builder;

builder {
    enable 'Deflater';
    grepcpan->to_app;
}

=end comment

=cut

=begin comment
# use this block if you want to include middleware such as Plack::Middleware::Deflater

use grepcpan;
use grepcpan_admin;

builder {
    mount '/'      => grepcpan->to_app;
    mount '/admin'      => grepcpan_admin->to_app;
}

=end comment

=cut

