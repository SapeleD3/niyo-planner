api_container = niyo-planner
file_name = docker-compose.yml

test:
	npm run test
build:
	docker compose -f ${file_name} build
up:
	docker compose -f ${file_name} build
	docker compose -f ${file_name} up  -d --remove-orphans
	npx prisma generate
	npx prisma db push
run: build up
down:
	docker compose -f ${file_name} down
show_logs:
	docker logs -f ${api_container}-server
