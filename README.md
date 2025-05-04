# metacpan-grep-front-end

Grep Front End code for [grep.metacpan.org](https://grep.metacpan.org)

[![Build Status](https://travis-ci.org/metacpan/metacpan-grep-front-end.svg?branch=master)](https://travis-ci.org/metacpan/metacpan-grep-front-end)
[![Coverage Status](https://coveralls.io/repos/github/metacpan/metacpan-grep-front-end/badge.svg?branch=master&cache=1)](https://coveralls.io/github/metacpan/metacpan-grep-front-end?branch=master)

[![grep.metacpan](https://raw.githubusercontent.com/metacpan/metacpan-grep-front-end/master/public/static/images/grep-cpan-logo-flat.png)](https://grep.metacpan.org)

## GETTING STARTED

grep.metacpan.org is currently not using [metacpan-developer](https://github.com/metacpan/metacpan-developer),
but it should be pretty straight forward to setup a development environment and starting submitting Pull Request via GitHub.

## Requirements

* docker & docker compose
* checkout a version of `metacpan-extracted` view details after to use `metacpan-cpan-extracted-lite`

## Cloning repositories

You should start forking the main [metacpan-grep-front-end repository](https://github.com/metacpan/metacpan-grep-front-end)
You can then clone it locally (where you should replace ~YOUR-GITHUB-USERNAME~ by your github username )

	> git clone git@github.com:~YOUR-GITHUB-USERNAME~/metacpan-grep-front-end.git
	> cd metacpan-grep-front-end
	> git remote add upstream https://github.com/metacpan/metacpan-grep-front-end.git

The frontend is not using a database, but a `git repo` itself as a backend.
For this the production is using one huge git repository (~20 Go) indexing all the CPAN in one place !
You can read more on this topic and find tools used to build this Git repo on the [GitHub Repos](https://grep.metacpan.org/source-code) page.

We do not want to use such a beast during development cycles, we only need a smaller version of it,
you can simply clone it from this [metacpan-cpan-extracted-lite](https://github.com/metacpan/metacpan-cpan-extracted-lite).
It should be clone at the same level of *metacpan-grep-front-end* itself (do not clone it inside the repository).

	# clone at the same level of metacpan-grep-front-end
	# cd .. # if you are in metacpan-grep-front-end repo
	> git clone https://github.com/metacpan/metacpan-cpan-extracted-lite.git

	# you should have something like this
	> ls -d metacpan-*
	metacpan-cpan-extracted-lite metacpan-grep-front-end

## Starting the development server

	> make # alias to `make up` or `make up-dev`
	Watching . bin/lib bin/app.psgi for file updates.
	HTTP::Server::PSGI: Accepting connections at http://0:5010/

This will start a docker container setup by `docker-compose.yml` using by default the `development` environment.

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
