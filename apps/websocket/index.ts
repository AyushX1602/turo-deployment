import { prismaClient } from "db";

Bun.serve({
  port: 8081,
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }

    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    async message(ws, message) {
      await prismaClient.todo.create({
        data: {
          title: message.toString(),
        },
      });

      ws.send(message);
    },
  },
});
