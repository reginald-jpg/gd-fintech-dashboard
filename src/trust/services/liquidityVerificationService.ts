/**
 * NEW FILE — Core liquidity verification orchestration (non-custodial: attest only).
 */
import { buildCertificate } from "./certificateService.js";
import { runPrechecks } from "./complianceEngine.js";
import { appendAudit } from "./auditService.js";
import { recordApiCall } from "./meteringService.js";
import { recordEdge, trustScoreForEntity } from "./trustGraphService.js";
import type { TenantContext } from "../types.js";

export interface LiquidityVerifyRequest {
  accountRef: string;
  requestedAmount: number;
  currency: string;
  counterpartyRef?: string;
}

export function verifyLiquidity(ctx: TenantContext, req: LiquidityVerifyRequest) {
  recordApiCall(ctx.tenantId, "LIQUIDITY_REALTIME");
  const compliance = runPrechecks(ctx.region, "LIQUIDITY_REALTIME", { amount: req.requestedAmount });

  if (compliance.decision === "DENY") {
    appendAudit(ctx, "liquidity.denied", { reason: "compliance", compliance });
    return {
      authorized: false,
      compliance,
      liquidityAttestation: null as null
    };
  }

  // Sandbox liquidity signal: deterministic from accountRef hash
  const pseudo = [...req.accountRef].reduce((a, c) => a + c.charCodeAt(0), 0) % 1000;
  const available = 10_000 + pseudo * 100;
  const authorized = available >= req.requestedAmount && compliance.decision === "ALLOW";

  recordEdge({
    from: { type: "ACCOUNT", ref: req.accountRef },
    to: { type: counterpartyType(req.counterpartyRef), ref: req.counterpartyRef ?? "unknown" },
    relation: "VERIFIED",
    riskWeight: authorized ? 2 : 8
  });

  appendAudit(ctx, "liquidity.checked", {
    authorized,
    amount: req.requestedAmount,
    currency: req.currency,
    availableSnapshot: available
  });

  const graph = trustScoreForEntity(req.accountRef);

  return {
    authorized,
    compliance,
    liquidityAttestation: {
      accountRef: req.accountRef,
      availableSnapshot: available,
      currency: req.currency,
      trustScore: graph.score,
      evaluatedAt: new Date().toISOString()
    },
    graphHints: graph.factors
  };
}

function counterpartyType(ref?: string): "MERCHANT" | "CUSTOMER" {
  if (!ref) return "CUSTOMER";
  return ref.startsWith("mer_") ? "MERCHANT" : "CUSTOMER";
}

export function issueProofOfFunds(ctx: TenantContext, req: LiquidityVerifyRequest & { holderName?: string }) {
  recordApiCall(ctx.tenantId, "PROOF_OF_FUNDS");
  const base = verifyLiquidity(ctx, req);
  if (!base.authorized || !base.liquidityAttestation) {
    appendAudit(ctx, "pof.denied", { base });
    return { ...base, certificate: null as null };
  }

  const certificate = buildCertificate({
    kind: "PROOF_OF_FUNDS",
    tenantId: ctx.tenantId,
    subjectRef: req.accountRef,
    attestation: `Non-custodial proof: available >= ${req.requestedAmount} ${req.currency} for holder ${req.holderName ?? "redacted"}`,
    ttlSeconds: 3600
  });

  appendAudit(ctx, "pof.issued", { certificateId: certificate.certificateId });
  return { ...base, certificate };
}

export function liquidityScore(ctx: TenantContext, accountRef: string) {
  recordApiCall(ctx.tenantId, "LIQUIDITY_SCORING");
  const g = trustScoreForEntity(accountRef);
  appendAudit(ctx, "liquidity.score", { accountRef, score: g.score });
  return {
    accountRef,
    score: g.score,
    factors: g.factors,
    modelVersion: "liquidity-score-v0.1"
  };
}
