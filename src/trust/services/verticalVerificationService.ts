/**
 * NEW FILE — Checkout, RWA, insurance, lottery verification stubs (extend with carrier / gaming integrations).
 */
import { buildCertificate } from "./certificateService.js";
import { runPrechecks } from "./complianceEngine.js";
import { appendAudit } from "./auditService.js";
import { recordApiCall } from "./meteringService.js";
import { recordEdge, trustScoreForEntity } from "./trustGraphService.js";
import type { TenantContext } from "../types.js";

export function checkoutVerify(
  ctx: TenantContext,
  req: { sessionId: string; amount: number; currency: string; merchantId: string; payerRef: string }
) {
  recordApiCall(ctx.tenantId, "CHECKOUT_VERIFY");
  const compliance = runPrechecks(ctx.region, "CHECKOUT_VERIFY", { amount: req.amount });
  const authorized = compliance.decision !== "DENY";
  recordEdge({
    from: { type: "CUSTOMER", ref: req.payerRef },
    to: { type: "MERCHANT", ref: req.merchantId },
    relation: "TRANSACTED_WITH",
    riskWeight: authorized ? 3 : 12
  });
  appendAudit(ctx, "checkout.verify", { ...req, authorized, compliance });
  return {
    sessionId: req.sessionId,
    authorized,
    compliance,
    merchantTrust: trustScoreForEntity(req.merchantId)
  };
}

export function rwaVerify(
  ctx: TenantContext,
  req: { assetId: string; jurisdiction: string; claimedValue: number; tokenContractRef?: string }
) {
  recordApiCall(ctx.tenantId, "RWA_INTEGRITY");
  const compliance = runPrechecks(ctx.region, "RWA_INTEGRITY", { amount: req.claimedValue });
  const integrityOk = compliance.decision !== "DENY" && req.claimedValue > 0;
  recordEdge({
    from: { type: "RWA", ref: req.assetId },
    to: { type: "VENDOR", ref: req.tokenContractRef ?? "offchain-asset" },
    relation: "ISSUED_BY",
    riskWeight: integrityOk ? 4 : 20
  });
  const certificate = integrityOk
    ? buildCertificate({
        kind: "PROOF_OF_ASSET",
        tenantId: ctx.tenantId,
        subjectRef: req.assetId,
        attestation: `RWA integrity check passed for jurisdiction ${req.jurisdiction}; token ref ${req.tokenContractRef ?? "n/a"}`,
        ttlSeconds: 7200
      })
    : null;
  appendAudit(ctx, "rwa.verify", { ...req, integrityOk });
  return { integrityOk, compliance, certificate, graph: trustScoreForEntity(req.assetId) };
}

export function insuranceClaimVerify(
  ctx: TenantContext,
  req: { claimId: string; policyId: string; claimedAmount: number; vendorRef?: string }
) {
  recordApiCall(ctx.tenantId, "INSURANCE_CLAIM");
  const compliance = runPrechecks(ctx.region, "INSURANCE_CLAIM", {
    amount: req.claimedAmount,
    insuranceClaimId: req.claimId
  });
  const approved = compliance.decision === "ALLOW";
  recordEdge({
    from: { type: "CLAIM", ref: req.claimId },
    to: { type: "VENDOR", ref: req.vendorRef ?? `policy:${req.policyId}` },
    relation: "ISSUED_BY",
    riskWeight: approved ? 5 : 25
  });
  const certificate = approved
    ? buildCertificate({
        kind: "PROOF_OF_INSURANCE_CLAIM",
        tenantId: ctx.tenantId,
        subjectRef: req.claimId,
        attestation: `Claim ${req.claimId} verified against policy ${req.policyId} (non-custodial attestation).`,
        ttlSeconds: 3600
      })
    : null;
  appendAudit(ctx, "insurance.claim", { ...req, approved });
  return { claimId: req.claimId, approved, compliance, certificate };
}

export function lotteryPayoutVerify(
  ctx: TenantContext,
  req: { ticketId: string; drawId: string; payoutAmount: number; licenseeRef: string }
) {
  recordApiCall(ctx.tenantId, "LOTTERY_PAYOUT");
  const compliance = runPrechecks(ctx.region, "LOTTERY_PAYOUT", {
    amount: req.payoutAmount,
    lotteryTicketId: req.ticketId
  });
  const allowed = compliance.decision !== "DENY";
  recordEdge({
    from: { type: "PAYOUT", ref: req.ticketId },
    to: { type: "MERCHANT", ref: req.licenseeRef },
    relation: "SETTLED_VIA",
    riskWeight: allowed ? 4 : 30
  });
  const certificate = allowed
    ? buildCertificate({
        kind: "PROOF_OF_LOTTERY_PAYOUT",
        tenantId: ctx.tenantId,
        subjectRef: req.ticketId,
        attestation: `Payout eligibility for draw ${req.drawId} attested; regulatory review flags: ${compliance.decision}`,
        ttlSeconds: 1800
      })
    : null;
  appendAudit(ctx, "lottery.payout", { ...req, allowed });
  return { ticketId: req.ticketId, allowed, compliance, certificate };
}
