import cors from "cors";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { openapiDocument } from "./config/openapi.js";
import { apiRateLimit } from "./middleware/rateLimit.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { healthRouter } from "./routes/health.js";
import { usersRouter } from "./routes/users.js";
import { sectorsRouter } from "./routes/sectors.js";
import { liquidityPassportRouter } from "./routes/liquidityPassport.js";
import industryIntelligenceRouter from "./routes/industryIntelligence.js";
import { trustLayerRouter } from "./routes/trustLayerRoutes.js";
import industryRoutes from "./routes/industryRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import intelRoutes from "./routes/intel.js";
import { MOCK_MODE, toggleMockMode } from "./config.js";
import { engines } from "./data/engines.js";
import { modules } from "./data/modules.js";
import { governance } from "./data/governance.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(requestLogger);

  const corsOrigins = (process.env.CORS_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: corsOrigins.length ? corsOrigins : true,
      credentials: true
    })
  );

  app.use(express.json({ limit: "1mb" }));

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

  app.use(apiRateLimit);
  app.use(healthRouter);
  // Convenience alias for frontend configs that assume `/api/*`
  app.get("/api/health", (_req, res) => res.status(200).json({ status: "ok" }));

  const v1 = express.Router();
  v1.use(usersRouter);
  v1.use(sectorsRouter);
  v1.use(liquidityPassportRouter);
  v1.use(industryIntelligenceRouter);
  /** EXTENDED — Global Trust Layer (non-custodial verification APIs). */
  v1.use(trustLayerRouter);
  app.use("/api/v1", v1);

  /**
   * EXTENDED — Legacy dashboard routes (company / industry matcher) previously mounted only in server.ts.
   */
  app.get("/api/mock-mode", (_req, res) => {
    res.json({ mock: MOCK_MODE });
  });
  app.post("/api/mock-mode/toggle", (_req, res) => {
    const newState = toggleMockMode();
    res.json({ mock: newState });
  });
  app.use("/api/industry", industryRoutes);
  app.use("/api/company", companyRoutes);
  app.get("/api/engines", (_req, res) => res.json(engines));
  app.get("/api/modules", (_req, res) => res.json(modules));
  app.get("/api/governance", (_req, res) => res.json(governance));
  app.get("/api/monitoring", (_req, res) => res.json({ status: "ok", engines }));

  /** Intel sectors + company match (`/api/intel/*`), same mount as local `server.ts`. */
  app.use("/api", intelRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

