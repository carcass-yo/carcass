IMAGE_TAG=$$(echo -en $$CI_COMMIT_SHA | tr -c '[:alnum:]_.-' '-')
APP_IMAGE_NAME="$$CI_REGISTRY_IMAGE:$(IMAGE_TAG)"

test:
	yarn install
	yarn run test

frontend:
	<% if (stack === 'node') { %>cd www/public/<% } else { %>cd www/<% } %>; \
	yarn install; \
	if [ "$$CI_ENVIRONMENT_NAME" == "production" ]; then \
		export NODE_ENV="production"; \
	fi; \
	yarn run webpack;

build:
	export APP_IMAGE_NAME="$(APP_IMAGE_NAME)"; \
	docker-compose build; \
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build; \
	docker push "$$APP_IMAGE_NAME";

deploy:
	export APP_IMAGE_NAME="$(APP_IMAGE_NAME)"; \
	export ENVIRONMENT="$$CI_ENVIRONMENT_NAME"; \
	export DOMAIN="$$CI_ENVIRONMENT_SLUG.$$CI_PROJECT_PATH_SLUG.swarm.zolotoykod.ru"; \
	export NODE_ENV="development" \
	if [ "$$ENVIRONMENT" == "production" ]; then \
		export NODE_ENV="production"; \
		if [ ! -z "$$PRODUCTION_DOMAIN" ]; then \
			export DOMAIN="$$DOMAIN,$$PRODUCTION_DOMAIN"; \
		fi; \
	fi; \
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml config > stack.yml; \
	docker stack deploy -c stack.yml --prune "$$CI_PROJECT_PATH_SLUG-$$ENVIRONMENT";
