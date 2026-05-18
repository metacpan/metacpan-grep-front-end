# metacpan-grep-front-end

Grep Front End code for [grep.metacpan.org](https://grep.metacpan.org)

[![Test Suite](https://github.com/metacpan/metacpan-grep-front-end/actions/workflows/testsuite.yml/badge.svg)](https://github.com/metacpan/metacpan-grep-front-end/actions/workflows/testsuite.yml)

[![grep.metacpan](https://raw.githubusercontent.com/metacpan/metacpan-grep-front-end/master/public/static/images/grep-cpan-logo-flat.png)](https://grep.metacpan.org)

A Perl/Dancer2 web application that provides regex search across all of CPAN.
It runs `git grep` against a local checkout of
[metacpan-cpan-extracted](https://github.com/metacpan/metacpan-cpan-extracted)
and presents results with syntax highlighting.

## Requirements

- Docker & Docker Compose
- A checkout of [metacpan-cpan-extracted-lite](https://github.com/metacpan/metacpan-cpan-extracted-lite) (for development/testing)

## Getting started

Fork and clone the repository:

```bash
git clone git@github.com:YOUR-USERNAME/metacpan-grep-front-end.git
cd metacpan-grep-front-end
git remote add upstream https://github.com/metacpan/metacpan-grep-front-end.git
```

Clone the lite CPAN repo at the **same level** (not inside the repository):

```bash
cd ..
git clone https://github.com/metacpan/metacpan-cpan-extracted-lite.git
```

Your directory layout should look like:

```
metacpan-cpan-extracted-lite/
metacpan-grep-front-end/
```

## Development

Start the development server:

```bash
make up-dev
```

The app runs on port 3000 inside the container, mapped to **`http://127.0.0.1:5010`** in development mode (configurable via `HOST_PORT` in `config/docker-compose.development.env`).

Source files are mounted from `src/` into the container. The dev server
auto-reloads when files under `lib/` or `bin/` change.

### Shell access

```bash
make bash   # opens a shell inside the running container
```

## Testing

Run the full test suite via Docker:

```bash
make test-setup   # one-time: clones metacpan-cpan-extracted-lite
make test          # runs prove inside a container
```

Or run tests inside an already-running container:

```bash
make bash
prove -l -Ilib -r -v t
```

Tests use [Test2::Suite](https://metacpan.org/pod/Test2::Suite) and are
located in `src/t/`.

## How it works

Every search goes through two phases:

1. **File listing** &mdash; `git grep -l` scans the full CPAN corpus (~19 GB) to find matching files. Results are cached to disk (Sereal binary + raw text).
2. **Context display** &mdash; `git grep -C` runs against the files for the current page and returns surrounding context lines for display.

Phase 1 is the bottleneck on cold cache. A background child process continues
caching results beyond the page limit so subsequent pages are instant.

### Forking model

`run_git_cmd_limit` forks a child that runs `git grep` and streams results
back via a pipe. The parent reads up to `limit` lines for the current request,
then signals the child with `USR1`. The child detaches (`setsid`) and continues
writing to a raw cache file in the background. Worker concurrency is controlled
via `flock()` on numbered slot files.

### Caching

- Cache directory: `var/tmp/` (configurable in `config.yml`)
- Format: Sereal binary (`.cache`) for parsed results, raw text (`.cache.raw`) for the file list
- Cache key: MD5 of the git command arguments
- `END_OF_FILE_MARKER` in the raw file signals a complete search
- `TOO_BUSY_MARKER` is returned when all worker slots are occupied

## Configuration

`src/config.yml` is the main Dancer2 configuration file. Key settings under
`grepcpan:`:

| Setting | Default | Description |
|---------|---------|-------------|
| `gitrepo` | &mdash; | Path to the CPAN extracted git repo |
| `maxworkers` | 1000 | Concurrent grep worker slots (flock-based) |
| `timeout.user_search` | 18s | HTTP response timeout |
| `timeout.grep_search` | 900s | Background grep process timeout |
| `limit.files_per_search` | 60 | Max files returned to the user |
| `limit.files_git_run_bg` | 2000 | Max files cached in background |
| `cache.version` | &mdash; | Bump to invalidate all caches |

Environment-specific overrides live in `src/environments/`:

```
src/config.yml                    # defaults
src/environments/development.yml  # local dev
src/environments/production.yml   # production
src/environments/metacpan.yml     # metacpan infra
```

Docker Compose environment files are in `config/`:

```
config/docker-compose.development.env
config/docker-compose.production.env
config/docker-compose.test.env
```

## Project layout

```
src/
  app.psgi              Plack entry point (Deflater middleware)
  docker-entrypoint.sh  Container startup script
  lib/
    grepcpan.pm         Dancer2 app: routes, cookie handling, templates
    GrepCpan/
      Grep.pm           Core search engine (git grep, caching, forking)
      std.pm            Pragma module (strict, warnings, signatures)
  views/                Template Toolkit templates (<% %> delimiters)
  public/               Static assets (JS, CSS, images)
  t/                    Test suite (Test2::Suite)
  config.yml            Dancer2 + app config
  environments/         Per-environment config overrides
Dockerfile              Two-stage build from metacpan/metacpan-base
docker-compose.yml      Base service definition
docker-compose.dev.yml  Dev overrides (source mount, hot reload)
docker-compose.test.yml Test runner
Makefile                Common development targets
```

## Make targets

| Target | Description |
|--------|-------------|
| `make up-dev` | Start development server (default) |
| `make up-prod` | Start production server |
| `make test-setup` | One-time clone of metacpan-cpan-extracted-lite |
| `make test` | Run test suite in Docker |
| `make bash` | Shell into running container |

## License

Same license as Perl itself.
