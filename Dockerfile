##
##  Temporary image for installing metacpan packages
##

FROM metacpan/metacpan-base:latest AS builder
SHELL [ "/bin/bash", "-eo", "pipefail", "-c" ]

# copy the cpanfile and cpanfile.snapshot
#   from the current directory to the /cpan directory in the image
    # and install the dependencies using cpm
# we could then reuse the cpanfile and cpanfile.snapshot for testing
WORKDIR /cpan

COPY cpanfile ./
COPY cpanfile.snapshot ./

RUN <<EOT
    cpm install -g \
               --without-test \
               --with-recommends \
               --with-develop \
               --cpanfile cpanfile
EOT

##
##  Runtime image for metacpan-grep-front-end
##

FROM builder AS runtime
SHELL [ "/bin/bash", "-eo", "pipefail", "-c" ]

WORKDIR /metacpan-grep-front-end

# Build arguments
ARG APP_ENV=development
ARG PLACKUP_ARGS="--port 3000"

# Runtime
ENV APP_ENV=$APP_ENV
ENV PLACKUP_ARGS=$PLACKUP_ARGS

# .dockerignore is used to exclude files from the build context
COPY src/ ./

# always expose a consistent port
EXPOSE 3000
# volume controlled by the docker-compose.yml
VOLUME [ "/metacpan-cpan-extracted" ]

# Make the entrypoint script executable
RUN chmod +x docker-entrypoint.sh

# Use the dynamic entrypoint
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["serve"]
