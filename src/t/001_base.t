use strict;
use warnings;

BEGIN {
	use FindBin;
	unshift @INC, $FindBin::Bin . "/lib";
}

use Test::Grep::MetaCPAN;

use Test::More tests => 1;

use_ok 'grepcpan';
