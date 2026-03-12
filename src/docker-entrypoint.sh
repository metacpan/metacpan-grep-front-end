#!/bin/bash -e

if [ "$1" = "serve" ]; then
    echo "Starting the application..."
    echo "Environment: $APP_ENV"
    echo "Host Port: $HOST_PORT"
    echo "Plackup Options: ${PLACKUP_ARGS}"
    echo "git binary: $(which git) - $(git --version)"
    echo "zoekt binary: $(which zoekt 2>/dev/null || echo 'not found')"
    echo "========================="

    # Build Zoekt index in background on startup
    if command -v zoekt-index >/dev/null 2>&1; then
        echo "Starting Zoekt index build in background..."
        /metacpan-grep-front-end/scripts/reindex-zoekt.sh &
    fi

    echo "Access the application at http://localhost:${HOST_PORT}"
    echo "========================="

    plackup -p 3000 ${PLACKUP_ARGS} bin/app.psgi
else
  echo "Running custom command: $@"
  exec "$@"
fi