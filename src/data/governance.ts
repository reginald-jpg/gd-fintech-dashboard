export const governance = {
  policies: [
    {
      id: "bias-detection",
      name: "Bias Detection",
      description: "Monitors outputs for demographic or sector bias.",
      status: "enabled",
      lastAudit: "2026-03-01"
    },
    {
      id: "explainability",
      name: "Explainability",
      description: "Ensures all model outputs include human-readable explanations.",
      status: "enabled",
      lastAudit: "2026-02-20"
    },
    {
      id: "data-quality",
      name: "Data Quality Enforcement",
      description: "Validates input data before scoring.",
      status: "enabled",
      lastAudit: "2026-03-10"
    },
    {
      id: "privacy",
      name: "Privacy Guardrails",
      description: "Prevents sensitive data from being used in scoring.",
      status: "enabled",
      lastAudit: "2026-03-05"
    }
  ],
  auditLog: [
    {
      id: "audit-001",
      timestamp: "2026-03-10",
      action: "Policy check",
      result: "All systems compliant"
    },
    {
      id: "audit-002",
      timestamp: "2026-03-01",
      action: "Bias scan",
      result: "No issues detected"
    }
  ]
};
