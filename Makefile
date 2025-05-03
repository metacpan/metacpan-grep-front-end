
.PHONY: all up-dev up-prod up test t

APP_ENV ?= development

# Add overload config for docker-compose
ifeq ($(APP_ENV),development)
  COMPOSE_FILE=docker-compose.yml:docker-compose.dev.yml
else ifeq ($(APP_ENV),test)
  COMPOSE_FILE=docker-compose.yml:docker-compose.dev.yml:docker-compose.test.yml
else
  COMPOSE_FILE=docker-compose.yml
endif

all:
	$(MAKE) up

up:
	ln -sf config/docker-compose.$(APP_ENV).env .env
	APP_ENV=$(APP_ENV) docker compose -f $(subst :, -f ,$(COMPOSE_FILE)) up --build --exit-code-from grep

up-dev:
	$(MAKE) up APP_ENV=development

up-prod:
	$(MAKE) up APP_ENV=production

t: test

test:
	$(MAKE) up APP_ENV=test