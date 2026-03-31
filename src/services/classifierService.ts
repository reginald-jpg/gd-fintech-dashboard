// src/services/classifierService.ts

export async function classifyCompany(name: string) {
  // Simple mock classifier — replace with real logic later
  const lower = name.toLowerCase();

  if (lower.includes("home depot")) {
    return {
      company: name,
      matchedSector: "Retail",
      confidence: 0.92,
      savings: {
        annualSavingsUsd: 1200000,
        savingsBand: "High",
        narrative: "Large retail operations benefit from optimized payments and fraud controls."
      },
      visibleFields: ["revenue", "employees", "locations"],
      trustFeatures: ["kyc", "aml", "fraud-monitoring"],
      riskModel: "payments",
      supportsBankingDemo: true,
      notes: "Retail classification based on known patterns."
    };
  }

  // Default fallback
  return {
    company: name,
    matchedSector: "General Business",
    confidence: 0.55,
    savings: {
      annualSavingsUsd: 250000,
      savingsBand: "Medium",
      narrative: "General business operations benefit from standard optimization."
    },
    visibleFields: ["revenue", "employees"],
    trustFeatures: ["basic-risk-checks"],
    riskModel: "generic",
    supportsBankingDemo: false,
    notes: "Default classification."
  };
}
