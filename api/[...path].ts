import { createApp } from "../src/app.js";
import intelRoutes from "../src/routes/intel.js";

/**
 * Vercel serverless entrypoint.
 *
 * This exposes the existing Express app under `/api/*` in Vercel:
 * - `/api/v1/*` (Trust Layer + existing v1 routes)
 * - `/api/intel/*` (intel routes)
 * - `/api/company/*`, `/api/industry/*`, `/api/engines`, `/api/modules`, `/api/governance`, `/api/monitoring`
 *
 * Note: `/health` is available locally. In Vercel, use `/api/health` (or add a rewrite `/health` -> `/api/health`).
 */
const app = createApp();
app.use("/api", intelRoutes);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function handler(req: any, res: any) {
  // Express is a `(req,res)` handler; Vercel passes Node req/res.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (app as any)(req, res);
}

