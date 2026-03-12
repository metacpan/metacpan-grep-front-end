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

## validate the git repository (for CI)
git config --global --add safe.directory /metacpan-cpan-extracted

## build Zoekt index for testing (if zoekt-index is available)
if command -v zoekt-index >/dev/null 2>&1; then
    echo "Building Zoekt index for tests..."
    mkdir -p /tmp/zoekt-test-index
    zoekt-index -index /tmp/zoekt-test-index /metacpan-cpan-extracted/distros
    echo "Zoekt index built."
fi

##
## run the tests
##
cd /metacpan-grep-front-end

export TABLE_TERM_SIZE=120

prove -l -Ilib -r -v t