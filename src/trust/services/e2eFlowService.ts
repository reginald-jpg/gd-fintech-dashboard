/**
 * NEW FILE — Sample orchestrated flow for demos (liquidity + PoF + graph + insurance/lottery extension).
 */
import type { TenantContext } from "../types.js";
import { appendAudit } from "./auditService.js";
import { issueProofOfFunds, verifyLiquidity } from "./liquidityVerificationService.js";
import { insuranceClaimVerify, lotteryPayoutVerify } from "./verticalVerificationService.js";
import { exportGraphSnapshot } from "./trustGraphService.js";

export async function runE2ELiquidityTrustFlow(
  ctx: TenantContext,
  input: {
    accountRef: string;
    amount: number;
    currency: string;
    extendInsurance?: { claimId: string; policyId: string; claimedAmount: number };
    extendLottery?: { ticketId: string; drawId: string; payoutAmount: number; licenseeRef: string };
  }
) {
  const steps: Array<{ step: string; result: unknown }> = [];

  const liquidity = verifyLiquidity(ctx, {
    accountRef: input.accountRef,
    requestedAmount: input.amount,
    currency: input.currency
  });
  steps.push({ step: "verifyLiquidity", result: liquidity });

  const pof = issueProofOfFunds(ctx, {
    accountRef: input.accountRef,
    requestedAmount: input.amount,
    currency: input.currency,
    holderName: "Demo Holder"
  });
  steps.push({ step: "proofOfFunds", result: pof });

  if (input.extendInsurance) {
    const ins = insuranceClaimVerify(ctx, input.extendInsurance);
    steps.push({ step: "insuranceClaimVerify", result: ins });
  }

  if (input.extendLottery) {
    const lot = lotteryPayoutVerify(ctx, input.extendLottery);
    steps.push({ step: "lotteryPayoutVerify", result: lot });
  }

  const graph = exportGraphSnapshot();
  steps.push({ step: "verificationGraphSnapshot", result: { edgeCount: graph.edges.length } });

  appendAudit(ctx, "flow.e2e.complete", { steps: steps.map((s) => s.step) });

  return {
    correlationId: ctx.correlationId,
    tenantId: ctx.tenantId,
    steps,
    summary: {
      liquidityAuthorized: liquidity.authorized,
      proofCertificateIssued: Boolean(pof.certificate),
      graphEdges: graph.edges.length
    }
  };
}
