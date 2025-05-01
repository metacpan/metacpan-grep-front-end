
.PHONY: all up-dev up-prod up

APP_ENV ?= development

all:
	$(MAKE) up

up:
	ln -sf config/docker-compose.$(APP_ENV).env .env
	APP_ENV=$(APP_ENV) docker compose up --build

up-dev:
	$(MAKE) up APP_ENV=development

up-prod:
	$(MAKE) up APP_ENV=production