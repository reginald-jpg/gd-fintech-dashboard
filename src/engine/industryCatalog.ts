// backend/src/engine/industryCatalog.ts

export interface IndustrySummary {
  id: string;
  name: string;
  description: string;
  typicalUseCases: string[];
  sampleCompanies: string[];
}

export interface IndustryDetail extends IndustrySummary {
  riskProfile: string;
  dataSignals: string[];
  modelNotes: string[];
}

// TODO: Replace placeholder data with your real 36 industries.
// For now, this keeps your frontend working and your backend stable.

export const INDUSTRIES: IndustryDetail[] = [
  {
    id: "payments",
    name: "Payments",
    description: "Companies that process, route, or settle financial transactions.",
    typicalUseCases: [
      "Merchant acquiring",
      "Payment orchestration",
      "Cross‑border settlement"
    ],
    sampleCompanies: ["Stripe", "Adyen", "Square"],
    riskProfile: "medium",
    dataSignals: [
      "High transaction volume",
      "Multiple payment rails",
      "Chargeback patterns"
    ],
    modelNotes: [
      "Uses payments risk model",
      "Optimized for transaction‑level metadata",
      "Supports savings estimation via routing efficiency"
    ]
  },

  {
    id: "lending",
    name: "Lending",
    description: "Platforms that originate, underwrite, or service loans.",
    typicalUseCases: [
      "Loan origination",
      "Credit decisioning",
      "Portfolio servicing"
    ],
    sampleCompanies: ["SoFi", "Upstart", "LendingClub"],
    riskProfile: "medium",
    dataSignals: [
      "Credit score distribution",
      "DTI ratios",
      "Repayment behavior"
    ],
    modelNotes: [
      "Uses lending risk model",
      "Supports underwriting optimization",
      "Savings tied to automation and risk reduction"
    ]
  },

  {
    id: "fraud",
    name: "Fraud Prevention",
    description: "Fraud detection, identity verification, and transaction risk control.",
    typicalUseCases: ["Device fingerprinting", "AML risk pre-checks", "Transaction monitoring"],
    sampleCompanies: ["Sift", "Feedzai", "Socure"],
    riskProfile: "high",
    dataSignals: ["velocity", "device risk", "chargebacks", "sanctions hits"],
    modelNotes: ["Uses fraud risk model", "High false-positive sensitivity", "Strong audit requirements"]
  },
  {
    id: "real-estate",
    name: "Real Estate FinTech",
    description: "Real estate lending, property underwriting, and settlement workflows.",
    typicalUseCases: ["Appraisal automation", "Title risk checks", "Settlement verification"],
    sampleCompanies: ["Blend", "Opendoor", "Rocket Mortgage"],
    riskProfile: "medium",
    dataSignals: ["property attributes", "liens", "valuation variance"],
    modelNotes: ["Often document-heavy", "Jurisdiction-specific constraints"]
  },
  {
    id: "insurance",
    name: "Insurance",
    description: "Underwriting, claims processing, and fraud-aware payout verification.",
    typicalUseCases: ["Claim verification", "Fraud scoring", "Policy lifecycle automation"],
    sampleCompanies: ["Lemonade", "Guidewire", "CCC"],
    riskProfile: "medium",
    dataSignals: ["claim frequency", "loss ratios", "vendor behavior"],
    modelNotes: ["Regulated by region/state", "Strong audit + explainability expectations"]
  }
];

export function getAllIndustries(): IndustrySummary[] {
  return INDUSTRIES.map((i) => ({
    id: i.id,
    name: i.name,
    description: i.description,
    typicalUseCases: i.typicalUseCases,
    sampleCompanies: i.sampleCompanies
  }));
}

export function getIndustryById(id: string): IndustryDetail | undefined {
  return INDUSTRIES.find((i) => i.id === id);
}
