# Niyo Planner

Welcome to Niyo Planner, a task management system developed by Moses Sapele for NIYO Group. This application provides a REST API for managing tasks, allowing users to create, read, update, and delete tasks efficiently, Niyo Planner is designed to streamline task management

## Features

- **User Authentication**: Secure endpoints using authentication.
- **Task Creation**: Easily create new tasks with specific details.
- **Fetch Tasks**: Easily create new tasks with specific details.
- **Task Update**: Update task status, priority, or other attributes.
- **Task Deletion**: Remove tasks that are no longer relevant.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications. [NestJS Documentation](https://nestjs.com/)
- **Prisma**: A modern database toolkit for TypeScript and Node.js that simplifies database access with type safety. Niyo Planner uses Prisma for database ORM. [Prisma Documentation](https://www.prisma.io/docs/)
- **PostgreSQL**: A powerful, open-source relational database system. Niyo Planner uses PostgreSQL for data storage. [PostgreSQL Documentation](https://www.postgresql.org/docs/)

- **Redis**: An in-memory data structure store used as a cache and message broker. Niyo Planner utilizes Redis for caching. [Redis Documentation](https://redis.io/documentation)

- **Jest**: A delightful JavaScript testing framework with a focus on simplicity. Niyo Planner uses Jest for unit testing. [Jest Documentation](https://jestjs.io/docs/en/getting-started)

- **Supertest**: A library for testing HTTP assertions in Node.js. Niyo Planner uses Supertest for end-to-end testing of API endpoints. [Supertest Documentation](https://github.com/visionmedia/supertest)

- **Docker**: A platform for developing, shipping, and running applications in containers. Niyo Planner is containerized using Docker. [Docker Documentation](https://docs.docker.com/)

- **Docker Compose**: A tool for defining and running multi-container Docker applications. Niyo Planner uses Docker Compose to orchestrate containers for the server, database, and Redis cache. [Docker Compose Documentation](https://docs.docker.com/compose/)

## Getting Started

Follow these instructions to set up and run Niyo Planner locally.

### Prerequisites

- Node.js and npm installed on your machine
- Docker installed on your machine
- Docker and Docker Compose installed (for running PostgreSQL and Redis)

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:SapeleD3/niyo-planner.git
   cd niyo-planner
   npm install

   ```

2. Build and start the application using the Makefile commands:

   ```bash
   # Build the Docker containers and start the application
    make run
   ```

### Using Makefile Commands

- `make test`: Run unit tests using Jest.
- `make build`: Build the Docker containers defined in docker-compose.yml.
- `make run`: Build and start the Niyo Planner application using Docker Compose.
- `make down`: Stop and remove the Docker containers.
- `make show_logs`: Display logs of the Niyo Planner server container.

## API Documentation

Detailed API documentation will be available here. [Documentation](http://localhost:3000/api#/) after server has been spun up

## NOTES

- on creating the tasks schema, i opted for adding a startDate and endDate to capture the intended duration of each task
