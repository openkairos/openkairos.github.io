---
title: Getting Started
---

The easiest way to explore Kairos is to run Kairos, Aletheia, and MongoDB together with Docker images.

The following `docker-compose.yml` file starts:

- the Kairos server
- the Aletheia dashboard
- a MongoDB instance

## Docker Compose configuration

Create a `docker-compose.yml` file with the following services, then run `docker compose up`.

```yaml
services:
  kairos:
    image: ghcr.io/openkairos/kairos:latest
    container_name: kairos
    ports:
      - "3000:3000"
    networks:
      - kairos_network
    depends_on:
      mongodb:
        condition: service_healthy
    environment:
      - MONGODB_CONNECTION_STRING=mongodb://mongodb:27017/kairos
      - NODE_ENV=production
      - APP_KEY=base64:replace-with-your-own-key
      - SUPER_ADMIN_USERNAME=admin
      - SUPER_ADMIN_EMAIL=admin@example.com
      - SUPER_ADMIN_PASSWORD=secret
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://localhost:3000/ >/dev/null"]
      interval: 5s
      timeout: 5s
      retries: 12
      start_period: 10s

  aletheia:
    image: ghcr.io/openkairos/aletheia:latest
    container_name: aletheia
    ports:
      - "8080:80"
    depends_on:
      kairos:
        condition: service_healthy
    networks:
      - kairos_network

  mongodb:
    image: mongo:8
    container_name: kairos_mongodb
    ports:
      - "27017:27017"
    networks:
      - kairos_network
    volumes:
      - kairos_mongodb_data:/data/db
    healthcheck:
      test: ["CMD", "mongosh", "--quiet", "--eval", "db.adminCommand({ ping: 1 })"]
      interval: 5s
      timeout: 5s
      retries: 12

networks:
  kairos_network:
    driver: bridge

volumes:
  kairos_mongodb_data:
```

After the stack is healthy, you can access:

- Aletheia dashboard at [http://localhost:8080](http://localhost:8080)
- Kairos API at [http://localhost:3000](http://localhost:3000)

:::danger

This configuration is for development and evaluation only. Do not use these example credentials or keys in production.

:::

## Generating an APP key

The application key is a base64-encoded value used for encryption and signing.

Using Node.js:

```bash
node -e "console.log('base64:' + require('crypto').randomBytes(32).toString('base64'))"
```

Using OpenSSL:

```bash
printf 'base64:' && openssl rand -base64 32
```

## Kairos environment variables

You can customize Kairos with the following variables:

| Variable Name | Description | Default Value |
| --- | --- | --- |
| `NODE_ENV` | Application environment | `development` |
| `PORT` | Port on which Kairos listens | `3000` |
| `MONGODB_CONNECTION_STRING` | Connection string for MongoDB | N/A |
| `APP_KEY` | Base64 encoded application key | N/A |
| `SUPER_ADMIN_USERNAME` | Bootstrap super admin username | N/A |
| `SUPER_ADMIN_EMAIL` | Bootstrap super admin email | N/A |
| `SUPER_ADMIN_PASSWORD` | Bootstrap super admin password | N/A |
