#!/bin/sh

[ -e .git/hooks/pre-commit ] ||  ln -s ../../tools/pre-commit.pl .git/hooks/pre-commit
cpanm App::cpm
cpanm Carton::Snapshot
cpm install -g --without-test \
               --with-recommends \
               --with-test \
               --with-develop \
               --cpanfile cpanfile
