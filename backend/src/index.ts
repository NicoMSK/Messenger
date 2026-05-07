import { startServer } from "./server.js";

const port = Number(process.env.PORT ?? 4000);
const clientUrl = process.env.CLIENT_URL ?? "http://localhost:5173";

startServer({ port, clientUrl });

