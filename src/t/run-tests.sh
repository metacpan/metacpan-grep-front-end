#!bash

set -ex

##
## install the extra test dependencies
##
cd /cpan

cpm install -g \
    --with-test \
    --with-recommends \
    --with-develop \
    --cpanfile cpanfile

##
## run the tests
##
cd /metacpan-grep-front-end

export TABLE_TERM_SIZE=120

prove -l -Ilib -r -v t