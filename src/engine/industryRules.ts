// src/engine/industryRules.ts

export type IndustryId = string;

export interface IndustryRuleConfig {
  id: IndustryId;
  name: string;
  supportsBankingDemo: boolean;
  visibleFields: string[];
  riskModel: "payments" | "lending" | "fraud" | "generic";
}

export const INDUSTRY_RULES: IndustryRuleConfig[] = [
  // Payments
  {
    id: "payments",
    name: "Payments & Money Movement",
    supportsBankingDemo: true,
    visibleFields: ["merchantId", "paymentRail", "settlementWindow", "fraudScore"],
    riskModel: "payments"
  },

  // Lending
  {
    id: "lending",
    name: "Lending",
    supportsBankingDemo: true,
    visibleFields: ["loanType", "creditScore", "dti", "repaymentSchedule"],
    riskModel: "lending"
  },

  // Fraud
  {
    id: "fraud",
    name: "Fraud Prevention",
    supportsBankingDemo: true,
    visibleFields: ["fraudScore", "velocity", "deviceFingerprint"],
    riskModel: "fraud"
  },

  // Real Estate FinTech
  {
    id: "real-estate",
    name: "Real Estate FinTech",
    supportsBankingDemo: false,
    visibleFields: ["propertyType", "lienPosition", "appraisalValue"],
    riskModel: "generic"
  },

  // Insurance
  {
    id: "insurance",
    name: "Insurance",
    supportsBankingDemo: false,
    visibleFields: ["policyType", "premium", "claimType"],
    riskModel: "generic"
  }
];

// -------------------------------------------------------------
// HELPERS
// -------------------------------------------------------------

export function getIndustryConfig(id: IndustryId) {
  return INDUSTRY_RULES.find(r => r.id === id);
}

// -------------------------------------------------------------
// MATCHING ENGINE
// -------------------------------------------------------------

export function matchCompanyToIndustry(
  companyName: string,
  overrideIndustryId?: IndustryId
) {
  const normalized = companyName.toLowerCase();

  // 1. Demo override
  if (overrideIndustryId) {
    const forced = getIndustryConfig(overrideIndustryId);
    return {
      industryId: forced?.id ?? overrideIndustryId,
      industryName: forced?.name ?? "Unknown Industry",
      confidence: 0.95,
      notes: ["Demo override used"],
      trust: {
        riskLevel: "low",
        rationale: "Demo override",
        dataFreshnessDays: 1
      }
    };
  }

  // 2. Keyword-based matching
  const paymentsKeywords = ["pay", "stripe", "checkout", "merchant"];
  const lendingKeywords = ["loan", "credit", "mortgage", "underwriting"];
  const fraudKeywords = ["fraud", "risk", "identity", "kyc", "aml"];

  if (paymentsKeywords.some(k => normalized.includes(k))) {
    const cfg = getIndustryConfig("payments");
    return {
      industryId: cfg?.id ?? "payments",
      industryName: cfg?.name ?? "Payments",
      confidence: 0.9,
      notes: ["Matched via payments keyword"],
      trust: {
        riskLevel: "medium",
        rationale: "Keyword match",
        dataFreshnessDays: 3
      }
    };
  }

  if (lendingKeywords.some(k => normalized.includes(k))) {
    const cfg = getIndustryConfig("lending");
    return {
      industryId: cfg?.id ?? "lending",
      industryName: cfg?.name ?? "Lending",
      confidence: 0.85,
      notes: ["Matched via lending keyword"],
      trust: {
        riskLevel: "medium",
        rationale: "Keyword match",
        dataFreshnessDays: 3
      }
    };
  }

  if (fraudKeywords.some(k => normalized.includes(k))) {
    const cfg = getIndustryConfig("fraud");
    return {
      industryId: cfg?.id ?? "fraud",
      industryName: cfg?.name ?? "Fraud Prevention",
      confidence: 0.88,
      notes: ["Matched via fraud keyword"],
      trust: {
        riskLevel: "high",
        rationale: "Fraud signal detected",
        dataFreshnessDays: 2
      }
    };
  }

  // 3. Fallback
  const fallback = getIndustryConfig("payments")!;
  return {
    industryId: fallback.id,
    industryName: fallback.name,
    confidence: 0.5,
    notes: ["Fallback match"],
    trust: {
      riskLevel: "medium",
      rationale: "Low signal",
      dataFreshnessDays: 7
    }
  };
}
