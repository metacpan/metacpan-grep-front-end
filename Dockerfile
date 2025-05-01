##
##  Temporary image for installing metacpan packages
##

FROM metacpan/metacpan-base:latest AS builder
SHELL [ "/bin/bash", "-eo", "pipefail", "-c" ]

WORKDIR /metacpan-grep-front-end

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

# Runtime
ENV APP_ENV=$APP_ENV

# FIXME
#ADD . /metacpan-grep-front-end
COPY src/ ./
RUN ls -la

# always expose a consistent port
EXPOSE 3000
# volume controlled by the docker-compose.yml
VOLUME [ "/metacpan-cpan-extracted" ]

# Make the entrypoint script executable
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Use the dynamic entrypoint
ENTRYPOINT ["./docker-entrypoint.sh"]
