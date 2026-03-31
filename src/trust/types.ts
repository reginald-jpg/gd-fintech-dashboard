/**
 * NEW FILE — Global Trust Layer shared types (non-custodial verification; no fund movement).
 */

export type RegionProfile = "US" | "EU" | "APAC" | "LATAM" | "HIGH_RISK";

export type TrustModuleKey =
  | "LIQUIDITY_REALTIME"
  | "PROOF_OF_FUNDS"
  | "LIQUIDITY_SCORING"
  | "FRAUD_GRAPH"
  | "SETTLEMENT_BRIDGE"
  | "CHECKOUT_VERIFY"
  | "TREASURY_DASHBOARD"
  | "INSURANCE_CLAIM"
  | "LOTTERY_PAYOUT"
  | "VENDOR_VERIFY"
  | "RWA_INTEGRITY"
  | "ATM_INTERBANK";

export interface TenantContext {
  tenantId: string;
  region: RegionProfile;
  /** Modules enabled for this request (resolved from tenant config + flags). */
  modules: Set<TrustModuleKey>;
  apiKeyId?: string;
  correlationId: string;
}

export interface VerificationCertificateBase {
  certificateId: string;
  kind:
    | "PROOF_OF_FUNDS"
    | "PROOF_OF_ASSET"
    | "PROOF_OF_SETTLEMENT"
    | "PROOF_OF_IDENTITY"
    | "PROOF_OF_VENDOR"
    | "PROOF_OF_LOTTERY_PAYOUT"
    | "PROOF_OF_INSURANCE_CLAIM";
  tenantId: string;
  subjectRef: string;
  issuedAt: string;
  expiresAt: string;
  /** Non-custodial attestation: verification outcome only. */
  attestation: string;
}
