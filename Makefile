dev:
	npm run start:dev

docker-up:
	docker-compose up

docker-down:
	docker-compose down

pro:
	npm run build
	npm run start:prod