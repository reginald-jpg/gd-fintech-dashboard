/**
 * NEW FILE — Versioned Trust Layer routes (mounted at /api/v1).
 */
import { Router } from "express";
import {
  getAuditLog,
  getLiquidityScore,
  postAtmVerify,
  postCheckoutVerify,
  postE2EFlow,
  postInsuranceClaimVerify,
  postInterbankVerify,
  postLotteryPayoutVerify,
  postProofOfFunds,
  postRwaVerify,
  postVerifyLiquidity
} from "../controllers/trustLayerController.js";
import { requireModule, trustContextMiddleware } from "../trust/middleware/trustContext.js";

export const trustLayerRouter = Router();

trustLayerRouter.use(trustContextMiddleware);

trustLayerRouter.post("/verifyLiquidity", requireModule("LIQUIDITY_REALTIME"), postVerifyLiquidity);
trustLayerRouter.post("/proofOfFunds", requireModule("PROOF_OF_FUNDS"), postProofOfFunds);
trustLayerRouter.get("/liquidityScore", requireModule("LIQUIDITY_SCORING"), getLiquidityScore);
trustLayerRouter.post("/checkoutVerify", requireModule("CHECKOUT_VERIFY"), postCheckoutVerify);
trustLayerRouter.get("/auditLog", getAuditLog);
trustLayerRouter.post("/rwa/verify", requireModule("RWA_INTEGRITY"), postRwaVerify);
trustLayerRouter.post("/atm/verify", requireModule("ATM_INTERBANK"), postAtmVerify);
trustLayerRouter.post("/interbank/verify", requireModule("ATM_INTERBANK"), postInterbankVerify);
trustLayerRouter.post("/insurance/claimVerify", requireModule("INSURANCE_CLAIM"), postInsuranceClaimVerify);
trustLayerRouter.post("/lottery/payoutVerify", requireModule("LOTTERY_PAYOUT"), postLotteryPayoutVerify);
trustLayerRouter.post("/flows/e2e-liquidity", postE2EFlow);
