#!/bin/bash -e

if [ "$1" = "serve" ]; then
    echo "Starting the application..."
    echo "Environment: $APP_ENV"
    echo "Host Port: $HOST_PORT"
    echo "Plackup Options: ${PLACKUP_ARGS}"
    echo "git binary: $(which git) - $(git --version)"
    echo "========================="
    echo "Access the application at http://localhost:${HOST_PORT}"
    echo "========================="

    plackup -p 3000 ${PLACKUP_ARGS} bin/app.psgi
else
  echo "Running custom command: $@"
  exec "$@"
fi