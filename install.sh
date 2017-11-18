#!/bin/sh

#cp tools/pre-commit.pl .git/hooks/pre-commit
[ -e .git/hooks/pre-commit ] ||  ln -s ../../tools/pre-commit.pl .git/hooks/pre-commit
cpanm --installdeps --with-develop --with-recommends .
