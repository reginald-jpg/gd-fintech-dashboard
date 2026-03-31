import type { TenantContext } from "../trust/types.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      trustContext?: TenantContext;
    }
  }
}

export {};
