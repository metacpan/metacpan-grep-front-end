use strict;
use warnings;

BEGIN {
	use FindBin;
	unshift @INC, $FindBin::Bin . "/lib";
}

use Test::Grep::MetaCPAN;

use grepcpan;
use Test2::Bundle::Extended;
use Plack::Test;
use HTTP::Request::Common;

my $app = grepcpan->to_app;
ok( ref $app eq 'CODE', 'Got app' );

my $test = Plack::Test->create($app);

# Static pages
for my $route ( '/about', '/faq', '/api', '/source-code' ) {
    my $res = $test->request( GET $route );
    ok $res->is_success, "[GET $route] successful";
    like $res->content, qr{<html}i, "[GET $route] returns HTML";
}

# Cache headers on static pages
for my $route ( '/about', '/faq', '/api' ) {
    my $res = $test->request( GET $route );
    like $res->header('Cache-Control'), qr{max-age=3600},
        "[GET $route] has Cache-Control header";
    ok $res->header('Surrogate-Control'),
        "[GET $route] has Surrogate-Control header";
    ok $res->header('Surrogate-Key'),
        "[GET $route] has Surrogate-Key header";
}

# Homepage cache headers
{
    my $res = $test->request( GET '/' );
    ok $res->is_success, '[GET /] successful';
    like $res->header('Cache-Control'), qr{max-age=3600},
        '[GET /] has Cache-Control header';
    is $res->header('Surrogate-Key'), 'homepage',
        '[GET /] Surrogate-Key is homepage';
}

# 404 for unknown routes
{
    my $res = $test->request( GET '/nonexistent-route' );
    ok !$res->is_success, '[GET /nonexistent-route] returns error';
}

done_testing;
