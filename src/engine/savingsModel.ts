// src/engine/savingsModel.ts

export interface SavingsEstimate {
  amount: number;
  notes: string[];
}

/**
 * Estimate annual savings based on industry string ID.
 * This aligns with industryCatalog.ts and industryRules.ts.
 */
export function estimateSavings(industryId: string): SavingsEstimate {
  switch (industryId) {
    case "payments":
      return {
        amount: 250000,
        notes: [
          "Savings from payment routing optimization",
          "Reduced chargeback losses",
          "Improved settlement efficiency"
        ]
      };

    case "lending":
      return {
        amount: 180000,
        notes: [
          "Savings from automated underwriting",
          "Lower manual review costs",
          "Improved credit decisioning accuracy"
        ]
      };

    case "fraud":
      return {
        amount: 300000,
        notes: [
          "Savings from reduced fraud losses",
          "Improved device fingerprinting",
          "Better anomaly detection"
        ]
      };

    case "real-estate":
      return {
        amount: 220000,
        notes: [
          "Savings from appraisal automation",
          "Reduced manual document processing",
          "Improved property risk scoring"
        ]
      };

    case "insurance":
      return {
        amount: 200000,
        notes: [
          "Savings from claims automation",
          "Improved fraud detection",
          "Reduced manual policy review"
        ]
      };

    default:
      return {
        amount: 150000,
        notes: [
          "Baseline savings estimate applied",
          "No industry‑specific model available"
        ]
      };
  }
}
