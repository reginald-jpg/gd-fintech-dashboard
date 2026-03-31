/**
 * NEW FILE — Policy / compliance pre-check orchestration (integrate vendor AML/KYC APIs here).
 */
import { REGION_COMPLIANCE } from "../config/regions.js";
import type { RegionProfile, TrustModuleKey } from "../types.js";

export interface CompliancePrecheckResult {
  region: RegionProfile;
  module: TrustModuleKey;
  checks: Record<string, "PASS" | "FAIL" | "REVIEW" | "SKIPPED">;
  decision: "ALLOW" | "DENY" | "REVIEW";
  policyVersion: string;
}

const POLICY_VERSION = "trust-policy-0.1.0";

export function runPrechecks(
  region: RegionProfile,
  module: TrustModuleKey,
  context: { amount?: number; corridor?: string; insuranceClaimId?: string; lotteryTicketId?: string }
): CompliancePrecheckResult {
  const pack = REGION_COMPLIANCE[region];
  const checks: CompliancePrecheckResult["checks"] = {};

  for (const c of pack.requiredPreChecks) {
    // Deterministic sandbox: escalate HIGH_RISK + large amount to REVIEW
    if (region === "HIGH_RISK" && (context.amount ?? 0) > 50_000 && c === "VELOCITY") {
      checks[c] = "REVIEW";
    } else if (module === "LOTTERY_PAYOUT" && c === "GAMING_REG") {
      checks[c] = "SKIPPED";
    } else {
      checks[c] = "PASS";
    }
  }

  if (module === "INSURANCE_CLAIM" && context.insuranceClaimId) {
    checks.INSURANCE_FRAUD = "PASS";
  }
  if (module === "LOTTERY_PAYOUT" && context.lotteryTicketId) {
    checks.GAMING_REG = "REVIEW";
  }

  const anyFail = Object.values(checks).some((v) => v === "FAIL");
  const anyReview = Object.values(checks).some((v) => v === "REVIEW");
  const decision: CompliancePrecheckResult["decision"] = anyFail ? "DENY" : anyReview ? "REVIEW" : "ALLOW";

  return { region, module, checks, decision, policyVersion: POLICY_VERSION };
}
