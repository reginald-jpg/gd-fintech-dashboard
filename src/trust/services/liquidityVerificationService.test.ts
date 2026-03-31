/**
 * NEW FILE — Unit tests for liquidity verification (Vitest).
 */
import { describe, expect, it } from "vitest";
import { verifyLiquidity } from "./liquidityVerificationService.js";
import type { TenantContext } from "../types.js";

const baseCtx = (over?: Partial<TenantContext>): TenantContext => ({
  tenantId: "t_test",
  region: "US",
  modules: new Set([
    "LIQUIDITY_REALTIME",
    "PROOF_OF_FUNDS",
    "LIQUIDITY_SCORING",
    "FRAUD_GRAPH",
    "CHECKOUT_VERIFY",
    "INSURANCE_CLAIM",
    "LOTTERY_PAYOUT",
    "RWA_INTEGRITY",
    "ATM_INTERBANK"
  ]),
  correlationId: "corr-1",
  ...over
});

describe("verifyLiquidity", () => {
  it("authorizes when sandbox balance heuristic covers amount", () => {
    const r = verifyLiquidity(baseCtx(), {
      accountRef: "acc_demo_1",
      requestedAmount: 100,
      currency: "USD"
    });
    expect(r.authorized).toBe(true);
    expect(r.liquidityAttestation).toBeTruthy();
  });

  it("denies when amount exceeds heuristic availability", () => {
    const r = verifyLiquidity(baseCtx(), {
      accountRef: "acc_demo_1",
      requestedAmount: 9_999_999,
      currency: "USD"
    });
    expect(r.authorized).toBe(false);
  });
});
