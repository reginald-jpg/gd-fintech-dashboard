import { createApp } from "../src/app.js";

/**
 * Vercel serverless entrypoint.
 *
 * Uses the same Express app as local `server.ts` (intel routes are mounted in `createApp()`).
 *
 * Note: `/health` is available locally. In Vercel, use `/api/health` (or rewrite `/health` -> `/api/health`).
 */
const app = createApp();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function handler(req: any, res: any) {
  // Express is a `(req,res)` handler; Vercel passes Node req/res.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (app as any)(req, res);
}

