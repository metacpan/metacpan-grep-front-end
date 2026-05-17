# CLAUDE.md

Guidelines for working on the metacpan-grep-front-end codebase.

## What is this project

A Perl/Dancer2 web application powering [grep.metacpan.org](https://grep.metacpan.org) — a regex search engine for all of CPAN. It runs `git grep` against a local checkout of [metacpan-cpan-extracted](https://github.com/metacpan/metacpan-cpan-extracted) and presents results with syntax highlighting.

## Quick start

```bash
# Development (requires Docker)
make up-dev

# Run tests
make test

# Or run tests inside existing container
docker exec -it grep-container bash
prove -l -Ilib -r -v t
```

The app runs on port 3000 inside Docker, mapped to `${HOST_PORT:-8088}` on the host.

## Architecture

```
src/
├── app.psgi              # Plack entry point (Deflater middleware)
├── lib/
│   ├── grepcpan.pm       # Dancer2 app: routes, cookie handling, templates
│   └── GrepCpan/
│       ├── Grep.pm       # Core search engine (git grep, caching, forking)
│       └── std.pm        # Pragma module (strict, warnings, signatures)
├── views/                # Template Toolkit templates
│   ├── layouts/main.tt   # HTML shell (CDN deps: Bootstrap 3, Prism.js, FA6)
│   ├── _display.tt       # Search form + results wrapper
│   ├── show-search.tt    # Code results rendering
│   └── show-ls.tt        # File-list results rendering
├── public/
│   ├── javascripts/grepcpan.js  # Client-side logic (vanilla JS, no jQuery)
│   └── css/grepcpan.css
├── t/                    # Test suite (Test2::Suite + prove)
└── config.yml            # Dancer2 + app config
```

### Core search flow

1. **Route** (`grepcpan.pm`) receives query params (`q`, `qd`, `qft`, `qci`, `qifl`)
2. **Sanitization** (`_sanitize_search`) strips newlines, escapes quotes, applies character whitelist
3. **Flavor detection** (`_get_git_grep_flavor`) picks `--fixed-string` or `-P` (PCRE)
4. **Regex validation** (`_validate_pcre_pattern`) rejects invalid PCRE before running grep
5. **Cache check** (`_get_match_cache`) looks for Sereal-encoded cache files
6. **Fork + grep** (`run_git_cmd_limit`) forks a child that runs `git grep -l`, streams results back via pipe, and writes to a raw cache file in background
7. **Pagination** (`get_list_of_files_to_search`) selects files for current page
8. **Context grep** (`_do_search`) runs `git grep -C` on selected files, parses output into structured blocks
9. **Template rendering** presents results with Prism.js syntax highlighting

### Forking model

`run_git_cmd_limit` uses a fork to avoid blocking the web process:
- **Parent**: reads up to `limit` lines from pipe, sends `USR1` to child when done
- **Child**: runs `git grep`, writes to pipe + cache file, detaches via `setsid()` after `USR1` to continue caching in background
- **Worker slots**: `check_if_a_worker_is_available` uses `flock()` on numbered files to limit concurrent grep processes

### Caching

- Cache files stored in `var/tmp/` (configurable)
- Format: Sereal binary (`.cache`) and raw text (`.cache.raw`)
- Cache key: MD5 of git command arguments
- Background searches write raw results; when complete, `END_OF_FILE_MARKER` signals completion
- `TOO_BUSY_MARKER` returned when all worker slots are occupied

## Conventions

- **Perl version**: 5.36+ (uses `v5.036` pragma in Grep.pm, `feature ':5.30'` + signatures in std.pm)
- **Signatures**: all subs use Perl signatures (`sub foo($self, %opts)`)
- **No Moose/Moo**: uses `Simple::Accessor` for object attributes
- **Templates**: Template Toolkit with `<% %>` delimiters
- **Encoding**: filters in templates: `| html_entity` for HTML context, `| uri` for URL params, `| html` for basic escaping
- **Tests**: Test2::Suite (`use Test2::Bundle::Extended`), run via `prove`
- **No external JS framework**: vanilla JavaScript, no jQuery dependency in app code

## Testing

Tests run inside Docker against a real (lite) CPAN extracted repo:
```bash
make test            # Full Docker-based test run
make test-setup      # One-time: clone metacpan-cpan-extracted-lite
```

Test files in `src/t/`:
- `001_base.t` — module loads
- `002_index_route.t`, `003_static_routes.t` — route smoke tests
- `GrepCpan-Grep-*.t` — unit tests for Grep.pm methods

When adding tests: use `Test2::Bundle::Extended`, create fixtures with `File::Temp`, mock git repos with `git init` + `git add` + `git commit`.

## Configuration

`src/config.yml` contains:
- `grepcpan.gitrepo` — path to the CPAN extracted git repo
- `grepcpan.maxworkers` — concurrent grep slots (1000 in config, controlled by flock)
- `grepcpan.timeout.user_search` — HTTP response timeout (18s)
- `grepcpan.timeout.grep_search` — background grep timeout (900s)
- `grepcpan.limit.files_per_search` — max files returned to user (60)
- `grepcpan.limit.files_git_run_bg` — max files cached in background (2000)
- `grepcpan.cache.version` — bump to invalidate all caches

## Docker

- `Dockerfile` — two-stage build from `metacpan/metacpan-base:latest`
- `docker-compose.yml` — base service definition
- `docker-compose.dev.yml` — dev overrides (source mount, hot reload)
- `docker-compose.test.yml` — runs test suite via `t/run-tests.sh`
- `docker-compose.test-setup.yml` — clones the lite CPAN repo

Environment files live in `config/docker-compose.*.env`.

## Known issues

- **Character whitelist in `_sanitize_search`** (line 221 of Grep.pm) corrupts regex patterns by replacing `+` and other valid PCRE metacharacters with `.` — this is the root cause of issue #41
- The distro filter (`qd` param) is interpolated into a regex without `quotemeta` in `get_list_of_files_to_search` (line 539)
