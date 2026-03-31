---
title: Quick Start
---

The fastest way to evaluate the stack is to run Kairos and Aletheia together with Docker Compose.

## Start the stack

Create a `docker-compose.yml` file with the following services:

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

Start it:

```bash
docker compose up
```

## Open the products

After the stack is healthy:

- Aletheia dashboard: `http://localhost:8080`
- Kairos API: `http://localhost:3000`

## Generate an application key

Kairos requires a base64-encoded application key for encryption and signing.

Using Node.js:

```bash
node -e "console.log('base64:' + require('crypto').randomBytes(32).toString('base64'))"
```

Using OpenSSL:

```bash
printf 'base64:' && openssl rand -base64 32
```

## Next steps

1. Read the system model to understand how Kairos and Aletheia fit together.
2. Review the profiles and identity section to understand the shared customer model.
3. Review the local stack guide when you want a more explicit operator workflow.

:::danger

The example credentials and keys in this guide are for local evaluation only. Replace them before any shared or production use.

:::
