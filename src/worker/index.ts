import { Hono } from "hono";

type Env = Record<string, unknown>;

const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

export default app;
