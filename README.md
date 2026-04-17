# Urban Farming Backend

A RESTful API backend for the Urban Farming application built with Node.js, Express, TypeScript, Prisma, and PostgreSQL.

## Prerequisites

- Node.js (v20+ recommended)
- PostgreSQL (if running locally without Docker)
- Docker & Docker Compose (for containerized deployment)

## Environment Setup

Create a `.env` file in the root directory based on the following template:

```env
# Change hostname to "db" (instead of localhost) and port to "5432" if using Docker, 
# or ensure it matches your local Postgres setup.
DATABASE_URL="postgresql://postgres:password@localhost:5432/urban_farming"
PORT=5000
JWT_SECRET="super_secret_jwt_key"
```

## How to Run: Using Docker (Recommended)

The easiest way to get the complete database and application stack up and running is via Docker.

1. Ensure Docker and Docker Compose are installed and running on your machine.
2. Build and start the containers in detached mode:
   ```bash
   docker compose up -d --build
   ```
3. The API will now be available at `http://localhost:5000`.

*(Note: The Docker configuration automatically generates the Prisma client and deploys database migrations during the container startup process).*

## How to Run: Manually (Local Development)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up PostgreSQL Database**
   Ensure your local PostgreSQL instance is running. The database credentials should match your `DATABASE_URL` from the `.env` file. You may need to manually create the root database via `psql` or `pgAdmin`:
   ```sql
   CREATE DATABASE urban_farming;
   ```

3. **Prisma Setup (Migrations & Generation)**
   Generate the Prisma Database Client and apply the database schema structure:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Seed the Database** (Optional)
   To populate your development database with dummy/seed data:
   ```bash
   npx prisma db seed
   ```

5. **Start the Development Server**
   Start the Express server using TypeScript node dev:
   ```bash
   npx ts-node-dev src/server.ts
   ```
   The API will be available at `http://localhost:5000`.

## API Documentation

Comprehensive Swagger UI documentation is automatically hosted based on standard OpenAPI configuration.

Once the application is running (either manually or via Docker), visit:  
**[http://localhost:5000/docs](http://localhost:5000/docs)**
