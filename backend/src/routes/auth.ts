import { Router } from "express";
import { loginUser } from "../store/store.js";

export function createAuthRouter() {
  const router = Router();

  router.post("/login", (req, res) => {
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    const user = loginUser(name);
    return res.json(user);
  });

  router.post("/logout", (req, res) => {
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    return res.json({ ok: true });
  });

  return router;
}

