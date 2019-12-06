FROM metacpan/metacpan-base:latest

ADD . /metacpan-grep-front-end
WORKDIR /metacpan-grep-front-end

RUN cpm install --without-test -g
EXPOSE 3000
CMD plackup -p 3000 ${GREP_PLACKUP_SERVER_ARGS} bin/app.psgi
