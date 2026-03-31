/**
 * NEW FILE — Tenant + correlation resolution (OAuth2 bearer / API key; extend with JWT validation).
 */
import type { NextFunction, Request, Response } from "express";
import crypto from "node:crypto";
import { HttpError } from "../../middleware/errorHandler.js";
import type { RegionProfile, TenantContext, TrustModuleKey } from "../types.js";
import { SANDBOX_DEFAULT_MODULES } from "../config/featureFlags.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  namespace Express {
    interface Request {
      trustContext?: TenantContext;
    }
  }
}

function parseRegion(h: string | undefined): RegionProfile {
  const r = (h ?? "US").toUpperCase();
  if (r === "US" || r === "EU" || r === "APAC" || r === "LATAM" || r === "HIGH_RISK") return r;
  return "US";
}

function enabledModules(header: string | undefined): Set<TrustModuleKey> {
  if (!header?.trim()) return new Set(SANDBOX_DEFAULT_MODULES);
  return new Set(header.split(",").map((s) => s.trim()) as TrustModuleKey[]);
}

export function trustContextMiddleware(req: Request, _res: Response, next: NextFunction) {
  const sandbox = process.env.TRUST_SANDBOX_MODE !== "false";

  const apiKey = (req.header("x-api-key") ?? req.header("authorization")?.replace(/^Bearer\s+/i, ""))?.trim();

  if (!sandbox && !apiKey) {
    return next(new HttpError(401, "API key or bearer token required", "TRUST_AUTH"));
  }

  const tenantId = req.header("x-tenant-id")?.trim() ?? (sandbox ? "tenant_sandbox" : "");
  if (!tenantId) {
    return next(new HttpError(400, "x-tenant-id required", "TENANT_REQUIRED"));
  }

  const region = parseRegion(req.header("x-trust-region"));
  const modules = enabledModules(req.header("x-trust-modules"));

  req.trustContext = {
    tenantId,
    region,
    modules,
    apiKeyId: apiKey ? crypto.createHash("sha256").update(apiKey).digest("hex").slice(0, 16) : undefined,
    correlationId: req.header("x-correlation-id")?.trim() ?? crypto.randomUUID()
  };

  next();
}

export function requireModule(module: TrustModuleKey) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const ctx = req.trustContext;
    if (!ctx) return next(new HttpError(500, "Trust context missing"));
    if (!ctx.modules.has(module)) {
      return next(new HttpError(403, `Module ${module} not enabled for tenant`, "MODULE_DISABLED"));
    }
    next();
  };
}
