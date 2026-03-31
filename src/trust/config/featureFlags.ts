/**
 * NEW FILE — Per-tenant module toggles (DB-backed in production; memory fallback for sandbox).
 */
import type { TrustModuleKey } from "../types.js";

/** Default sandbox tenant enables core verification modules only. */
export const SANDBOX_DEFAULT_MODULES: TrustModuleKey[] = [
  "LIQUIDITY_REALTIME",
  "PROOF_OF_FUNDS",
  "LIQUIDITY_SCORING",
  "FRAUD_GRAPH",
  "CHECKOUT_VERIFY",
  "INSURANCE_CLAIM",
  "LOTTERY_PAYOUT",
  "RWA_INTEGRITY",
  "ATM_INTERBANK"
];

export function parseModuleList(raw: string | undefined): TrustModuleKey[] {
  if (!raw?.trim()) return [...SANDBOX_DEFAULT_MODULES];
  return raw.split(",").map((s) => s.trim()) as TrustModuleKey[];
}
