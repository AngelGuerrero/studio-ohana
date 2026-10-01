FROM node:20-alpine

WORKDIR /app

# Corepack mantiene la versión de pnpm gestionada por el proyecto.
RUN corepack enable

COPY docker-entrypoint-dev.sh /usr/local/bin/docker-entrypoint-dev
RUN chmod +x /usr/local/bin/docker-entrypoint-dev

COPY . .

EXPOSE 4321
