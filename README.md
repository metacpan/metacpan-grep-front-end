# metacpan-grep-front-end

Grep Front End code for [grep.metacpan.org](https://grep.metacpan.org)

[![Build Status](https://travis-ci.org/metacpan/metacpan-grep-front-end.svg?branch=master)](https://travis-ci.org/metacpan/metacpan-grep-front-end)
[![Coverage Status](https://coveralls.io/repos/github/metacpan/metacpan-grep-front-end/badge.svg?branch=master)](https://coveralls.io/github/metacpan/metacpan-grep-front-end?branch=master)

[![grep.metacpan](https://raw.githubusercontent.com/metacpan/metacpan-grep-front-end/master/public/static/images/grep-cpan-logo-flat.png)](https://grep.metacpan.org)

## GETTING STARTED

grep.metacpan.org is currently not using [metacpan-developer](https://github.com/metacpan/metacpan-developer),
but it should be pretty straight forward to setup a development environment and starting submitting Pull Request via GitHub.

## Requirements

* a git client (should be compiled with libpcre)
* perl 5.22 or later (5.22 is the recommended version, consider [using perlbrew](https://perlbrew.pl))
* App::cpanminus (read manual on [metacpan](https://metacpan.org/pod/App::cpanminus) )

### git with pcre support

For macOS users, it's recommended to use [homebrew](https://brew.sh) to install git with pcre support

	> brew install pcre
	> brew reinstall --with-pcre git

You can check if git support pcre by using the '-P' option

	# example:
	> git grep -c -P "\w"

## Cloning repositories

You should start forking the main (metacpan-grep-front-end repository)[https://github.com/metacpan/metacpan-grep-front-end]
You can then clone it locally (where you should replace ~YOUR-GITHUB-USERNAME~ by your github username )

	> git clone git@github.com:~YOUR-GITHUB-USERNAME~/metacpan-grep-front-end.git
	> cd metacpan-grep-front-end
	> git remote add upstream https://github.com/metacpan/metacpan-grep-front-end.git

The frontend is not using a database, but a `git repo` itself as a backend.
For this the production is using one huge git repository (~20 Go) indexing all the CPAN in one place !
You can read more on this topic and find tools used to build this Git repo on the (GitHub Repos)[https://grep.metacpan.org/source-code] page.

We do not want to use such a beast during development cycles, we only need a smaller version of it,
you can simply clone it from this (metacpan-extracted-lite)[https://github.com/atoomic/metacpan-extracted-lite].
It should be clone at the same level of *metacpan-grep-front-end* itself (do not clone it inside the repository).

	# clone at the same level of metacpan-grep-front-end
	# cd ..; # if you are in metacpan-grep-front-end repo
	> git clone https://github.com/atoomic/metacpan-extracted-lite.git

	# you should have something like this
	> ls -d metacpan-*
	metacpan-extracted-lite metacpan-grep-front-end

## Installing dependencies

Now that you have the repository set, let's install all the perl modules required.

You can check your perl version. ( 5.022001 is the recommended one for now )

	perl -E 'say $]'

All modules are listed in the `cpanfile` file itself.
Running `install.sh` itself should do all the magic
( which does more than only installing the perl modules )

	./install.sh

But if you prefer you can simply run manually:

	> cpanm --installdeps --with-develop --with-recommends .

## Starting the development server

Once you have installed all perl modules, you should be able to start
the plack server by simply running:

	> ./devel-server
	Watching . bin/lib bin/app.psgi for file updates.
	HTTP::Server::PSGI: Accepting connections at http://0:5010/

This would use plack to run the psgi app and listen by default on port 5010.
Any change to any of the file, should automatically trigger a plack restart.

You should let that plack server run in a dedicated terminal then use another
terminal for your own development.
Note: errors would be logged in the 'devel-server' terminal.

You can now open your browser to this url, and you should be able to see the
grep.metacpan.org homepage.

	http://127.0.0.1:5010

## Custom configurations

Each environment comes with its own environment,
by default they all use values from the default configuration `config.yml`,
but they can overwrite some values or provide some custom values using their own
file.

	config.yml
	environments/development.yml
	environments/metacpan.yml
	environments/production.yml

If you need two tweak your development environment you should look at `environments/development.yml`
You can even create your own environment if required.

From there you should be ready to

	# hack, hack, hack...
	-> Submit a Pull Request to GitHub
	# continue to hack, hack, ...
	have fun !

## Travis CI

The project comes with a basic `.travis.yml` file.

If you want to start smoking your own branches, you simply need to link your [GitHub account](https://github.com)
to your (Travis CI account)[https://travis-ci.org/], then enable the repository in your (Travis Dashboard)[https://travis-ci.org/dashboard]

Note that any Pull Request submitted via GitHub would trigger a Travis smoke without any settings required from your side :-)
