export const engines = [
  {
    id: "sector-classifier",
    name: "Sector Classifier",
    description: "Classifies companies into one of 36 sectors using embeddings + rules.",
    status: "online",
    version: "1.2.0",
    metrics: {
      accuracy: 0.91,
      latencyMs: 120,
      coverage: "36 sectors"
    },
    inputs: ["company name", "description", "keywords"],
    outputs: ["sectorId", "confidence"]
  },
  {
    id: "risk-model",
    name: "Risk Model",
    description: "Scores companies for operational, financial, and compliance risk.",
    status: "online",
    version: "2.0.1",
    metrics: {
      accuracy: 0.87,
      latencyMs: 180,
      coverage: "all sectors"
    },
    inputs: ["financials", "sector", "signals"],
    outputs: ["riskScore", "riskBand"]
  },
  {
    id: "savings-engine",
    name: "Savings Intelligence Engine",
    description: "Estimates potential savings from automation and optimization.",
    status: "online",
    version: "1.0.5",
    metrics: {
      accuracy: 0.82,
      latencyMs: 150,
      coverage: "enterprise + SMB"
    },
    inputs: ["process data", "sector", "volume"],
    outputs: ["savingsEstimate", "confidence"]
  },
  {
    id: "trust-layer",
    name: "Global Trust Layer",
    description: "Ensures governance, compliance, and explainability across all engines.",
    status: "online",
    version: "3.1.0",
    metrics: {
      accuracy: 0.99,
      latencyMs: 40,
      coverage: "all models"
    },
    inputs: ["model outputs", "audit logs"],
    outputs: ["explanations", "policyFlags"]
  }
];
