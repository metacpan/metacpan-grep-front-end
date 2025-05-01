
.PHONY: all up-dev up-prod up

APP_ENV ?= development

# Add overload config for docker-compose
ifeq ($(APP_ENV),development)
  COMPOSE_FILE=docker-compose.yml:docker-compose.dev.yml
else
  COMPOSE_FILE=docker-compose.yml
endif

all:
	$(MAKE) up

up:
	ln -sf config/docker-compose.$(APP_ENV).env .env
	APP_ENV=$(APP_ENV) docker compose -f $(subst :, -f ,$(COMPOSE_FILE)) up --build

up-dev:
	$(MAKE) up APP_ENV=development

up-prod:
	$(MAKE) up APP_ENV=production