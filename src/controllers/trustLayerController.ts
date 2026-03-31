/**
 * NEW FILE — HTTP handlers for Global Trust Layer (/api/v1/*).
 */
import type { Request, Response } from "express";
import { z } from "zod";
import { HttpError } from "../middleware/errorHandler.js";
import { queryAudit } from "../trust/services/auditService.js";
import { normalizeIso8583, Iso8583VerifySchema } from "../trust/services/iso8583Adapter.js";
import { normalizeIso20022, Iso20022VerifySchema } from "../trust/services/iso20022Adapter.js";
import {
  issueProofOfFunds,
  liquidityScore,
  verifyLiquidity
} from "../trust/services/liquidityVerificationService.js";
import {
  checkoutVerify,
  insuranceClaimVerify,
  lotteryPayoutVerify,
  rwaVerify
} from "../trust/services/verticalVerificationService.js";
import { runE2ELiquidityTrustFlow } from "../trust/services/e2eFlowService.js";
import { runPrechecks } from "../trust/services/complianceEngine.js";
import { appendAudit } from "../trust/services/auditService.js";
import { recordApiCall } from "../trust/services/meteringService.js";

function ctx(req: Request) {
  if (!req.trustContext) throw new HttpError(500, "Trust context missing");
  return req.trustContext;
}

const LiquidityBody = z.object({
  accountRef: z.string().min(1),
  requestedAmount: z.number().positive(),
  currency: z.string().length(3),
  counterpartyRef: z.string().optional()
});

const ProofOfFundsBody = LiquidityBody.extend({
  holderName: z.string().optional()
});

const LiquidityScoreQuery = z.object({
  accountRef: z.string().min(1)
});

const CheckoutBody = z.object({
  sessionId: z.string().min(1),
  amount: z.number().positive(),
  currency: z.string().length(3),
  merchantId: z.string().min(1),
  payerRef: z.string().min(1)
});

const RwaBody = z.object({
  assetId: z.string().min(1),
  jurisdiction: z.string().min(2),
  claimedValue: z.number().positive(),
  tokenContractRef: z.string().optional()
});

const InsuranceBody = z.object({
  claimId: z.string().min(1),
  policyId: z.string().min(1),
  claimedAmount: z.number().positive(),
  vendorRef: z.string().optional()
});

const LotteryBody = z.object({
  ticketId: z.string().min(1),
  drawId: z.string().min(1),
  payoutAmount: z.number().positive(),
  licenseeRef: z.string().min(1)
});

const E2EBody = z.object({
  accountRef: z.string().min(1),
  amount: z.number().positive(),
  currency: z.string().length(3),
  extendInsurance: InsuranceBody.optional(),
  extendLottery: LotteryBody.optional()
});

export async function postVerifyLiquidity(req: Request, res: Response) {
  const body = LiquidityBody.parse(req.body);
  const out = verifyLiquidity(ctx(req), body);
  res.json(out);
}

export async function postProofOfFunds(req: Request, res: Response) {
  const body = ProofOfFundsBody.parse(req.body);
  const out = issueProofOfFunds(ctx(req), body);
  res.json(out);
}

export async function getLiquidityScore(req: Request, res: Response) {
  const q = LiquidityScoreQuery.parse(req.query);
  const out = liquidityScore(ctx(req), q.accountRef);
  res.json(out);
}

export async function postCheckoutVerify(req: Request, res: Response) {
  const body = CheckoutBody.parse(req.body);
  const out = checkoutVerify(ctx(req), body);
  res.json(out);
}

export async function getAuditLog(req: Request, res: Response) {
  const tenantId = ctx(req).tenantId;
  const limit = z.coerce.number().int().min(1).max(200).optional().parse(req.query.limit);
  const eventType = z.string().optional().parse(req.query.eventType);
  const entries = queryAudit({ tenantId, limit, eventType });
  res.json({ entries, tenantId });
}

export async function postRwaVerify(req: Request, res: Response) {
  const body = RwaBody.parse(req.body);
  const out = rwaVerify(ctx(req), body);
  res.json(out);
}

export async function postAtmVerify(req: Request, res: Response) {
  const raw = Iso8583VerifySchema.parse(req.body);
  const normalized = normalizeIso8583(raw);
  const c = ctx(req);
  recordApiCall(c.tenantId, "ATM_INTERBANK");
  const compliance = runPrechecks(c.region, "ATM_INTERBANK", { amount: normalized.amount });
  appendAudit(c, "atm.iso8583", { normalized, compliance });
  const authorized = compliance.decision !== "DENY";
  res.json({
    authorized,
    compliance,
    normalized,
    latencyBudgetMs: 1000
  });
}

export async function postInterbankVerify(req: Request, res: Response) {
  const raw = Iso20022VerifySchema.parse(req.body);
  const normalized = normalizeIso20022(raw);
  const c = ctx(req);
  recordApiCall(c.tenantId, "ATM_INTERBANK");
  const compliance = runPrechecks(c.region, "ATM_INTERBANK", { amount: normalized.amount });
  appendAudit(c, "interbank.iso20022", { normalized, compliance });
  const authorized = compliance.decision !== "DENY";
  res.json({ authorized, compliance, normalized });
}

export async function postInsuranceClaimVerify(req: Request, res: Response) {
  const body = InsuranceBody.parse(req.body);
  const out = insuranceClaimVerify(ctx(req), body);
  res.json(out);
}

export async function postLotteryPayoutVerify(req: Request, res: Response) {
  const body = LotteryBody.parse(req.body);
  const out = lotteryPayoutVerify(ctx(req), body);
  res.json(out);
}

export async function postE2EFlow(req: Request, res: Response) {
  const body = E2EBody.parse(req.body);
  const out = await runE2ELiquidityTrustFlow(ctx(req), body);
  res.json(out);
}
