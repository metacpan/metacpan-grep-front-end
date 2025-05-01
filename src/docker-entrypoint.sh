#!/bin/bash -e

echo "Starting the application..."
echo "Environment: $APP_ENV"
echo "Host Port: $HOST_PORT"
echo "Plackup Options: $PLACKUP_ARGS"

echo "========================="
which git
git --version
echo "========================="

pwd
ls -l /metacpan-grep-front-end

plackup -p 3000 ${PLACKUP_ARGS} bin/app.psgi