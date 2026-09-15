FROM oven/bun:1

WORKDIR /usr/src/app

COPY package.json bun.lock turbo.json ./
COPY apps/websocket/package.json apps/websocket/package.json
COPY packages/db/package.json packages/db/package.json

RUN bun install

COPY . .

RUN bun run generate:db

EXPOSE 8081

CMD ["bun", "start:ws"]
