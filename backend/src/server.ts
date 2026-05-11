import express from "express";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import morgan from "morgan";

import { createAuthRouter } from "./routes/auth.js";
import { createChatRouter } from "./routes/chat.js";
import { initSocket } from "./websocket/socket.js";

export type StartServerOptions = {
  port: number;
  clientUrl: string;
};

export function startServer({ port, clientUrl }: StartServerOptions) {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: clientUrl,
      credentials: true,
    }),
  );

  app.use(morgan("combined"));

  const httpServer = http.createServer(app);
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: clientUrl,
      credentials: true,
    },
  });

  app.use(createAuthRouter());
  app.use(createChatRouter(io));

  initSocket(io);

  httpServer.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
  });
}
