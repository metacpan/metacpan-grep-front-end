# CLAUDE.md

## What is this project?

**metacpan-grep-front-end** — the web frontend for [grep.metacpan.org](https://grep.metacpan.org), a code search engine for CPAN (Perl packages). It runs `git grep` against a large git repository containing extracted CPAN distributions and presents results via a Dancer2 web app.

## Build & Run (Docker)

Everything runs in Docker. The Makefile selects docker-compose overlays based on `APP_ENV`.

```bash
make              # Start dev server (alias: make up-dev)
make up-prod      # Start production server
make test         # Run test suite in Docker
make test-setup   # Run tests with setup step (installs test deps first)
make bash         # Shell into running container
```

The dev server is available at `http://127.0.0.1:8088` (configurable via `HOST_PORT` in `.env`).

### Prerequisites

- Docker & docker-compose
- Clone [metacpan-cpan-extracted-lite](https://github.com/metacpan/metacpan-cpan-extracted-lite) as a sibling directory (provides the git repo backend for development)

### Environment files

Docker env files live in `config/docker-compose.{development,production,test}.env`. The Makefile symlinks the appropriate one to `.env`.

## Testing

Tests run inside the Docker container via `prove`:

```bash
prove -l -Ilib -r -v t    # (inside container)
```

Test files are in `src/t/`. Test helpers live in `src/t/lib/Test/Grep/MetaCPAN.pm`. Tests use `Test2::Suite` and `Test::More`.

## Architecture

### Directory layout

```
src/                          # Application code (mounted into Docker at /metacpan-grep-front-end)
  app.psgi                    # PSGI entry point (Plack + Dancer2)
  lib/
    grepcpan.pm               # Main Dancer2 app — routes, request handling
    GrepCpan/
      Grep.pm                 # Core search engine — git grep execution, caching, result parsing
      std.pm                  # Standard imports/pragmas
  views/                      # Template Toolkit templates (.tt)
    layouts/main/             # Layout partials (_header, _pagination, etc.)
  public/                     # Static assets (CSS, JS, images)
  config.yml                  # Main Dancer2 config
  environments/               # Per-environment config overrides (development.yml, production.yml, etc.)
  t/                          # Test suite
  bin/                        # Contains app.psgi (alternate location)

config/                       # Docker env files
deploy/                       # Deployment configs
launcher/                     # Server launch scripts (devel-server, production-server)
tools/                        # Dev tools (pre-commit hook, asset updater)
```

### Key modules

- **`grepcpan.pm`** — Dancer2 application. Defines all HTTP routes (`/`, `/search`, `/api/search`, `/about`, `/faq`, etc.). Handles search queries, cookie-based search history, and template rendering.
- **`GrepCpan::Grep`** — Core search logic. Wraps `Git::Repository` to run `git grep` against the CPAN extracted repo. Manages result caching (Sereal-serialized), background grep processes, pagination, and worker limits.

### How search works

1. User submits a search query via the web UI
2. `grepcpan.pm` route handler calls `GrepCpan::Grep` methods
3. `Grep.pm` executes `git grep` against the mounted CPAN git repository
4. Results are cached to disk (Sereal format) in `var/tmp/`
5. Results are paginated and rendered via Template Toolkit

### Configuration

`src/config.yml` holds the main config under the `grepcpan` key:
- `gitrepo` — path to the CPAN extracted git repository
- `maxworkers` — max concurrent grep processes
- `timeout` — user-facing and background grep timeouts
- `limit` — pagination limits (files per search, distros per page, context lines)
- `cache` — cache directory and version

Per-environment overrides in `src/environments/*.yml`.

## Conventions

- Perl code uses `v5.036` features (signatures, strict, warnings via `GrepCpan::std`)
- Templates use Template Toolkit with `<% %>` delimiters
- The app never writes to the CPAN git repo — it's mounted read-only
- Static assets are versioned via `tools/update-assets.pl`
- Branch naming: contributions via pull requests to `master`
