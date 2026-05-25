import express from "express";
import cors from "cors";
import http from "http";
import morgan from "morgan";

import { createAuthRouter } from "./routes/auth.js";
import { createChatRouter } from "./routes/chat.js";
import { initWsServer, broadcastAll } from "./websocket/wsServer.js";

export type StartServerOptions = {
  port: number;
  clientUrl: string;
};

export function startServer({ port, clientUrl }: StartServerOptions) {
  const app = express();

  app.use(express.json());
  app.use(cors({ origin: clientUrl, credentials: true }));
  app.use(morgan("dev"));

  const httpServer = http.createServer(app);

  initWsServer(httpServer);

  app.use(createAuthRouter());
  app.use(createChatRouter(broadcastAll));

  httpServer.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
  });
}
