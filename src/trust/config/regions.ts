/**
 * NEW FILE — Region-aware compliance profiles (align to SOC2/ISO/GDPR/PCI framing; legal review required pre-production).
 */
import type { RegionProfile } from "../types.js";

export type ComplianceFramework = "SOC2" | "PCI_DSS" | "ISO27001" | "GDPR" | "GLBA" | "CCPA" | "PSD2" | "AML";

export interface RegionCompliancePack {
  region: RegionProfile;
  frameworks: ComplianceFramework[];
  auditRetentionDays: number;
  /** Signals to enforce in policy engine (extensible). */
  requiredPreChecks: ("AML" | "SANCTIONS" | "PEP" | "VELOCITY" | "DEVICE" | "INSURANCE_FRAUD" | "GAMING_REG")[];
}

export const REGION_COMPLIANCE: Record<RegionProfile, RegionCompliancePack> = {
  US: {
    region: "US",
    frameworks: ["SOC2", "PCI_DSS", "GLBA", "CCPA", "AML"],
    auditRetentionDays: 2555,
    requiredPreChecks: ["AML", "SANCTIONS", "PEP", "VELOCITY"]
  },
  EU: {
    region: "EU",
    frameworks: ["GDPR", "PSD2", "ISO27001", "AML"],
    auditRetentionDays: 2190,
    requiredPreChecks: ["AML", "SANCTIONS", "DEVICE"]
  },
  APAC: {
    region: "APAC",
    frameworks: ["ISO27001", "AML"],
    auditRetentionDays: 2190,
    requiredPreChecks: ["AML", "SANCTIONS", "VELOCITY"]
  },
  LATAM: {
    region: "LATAM",
    frameworks: ["ISO27001", "AML"],
    auditRetentionDays: 2190,
    requiredPreChecks: ["AML", "SANCTIONS", "PEP"]
  },
  HIGH_RISK: {
    region: "HIGH_RISK",
    frameworks: ["ISO27001", "AML"],
    auditRetentionDays: 3650,
    requiredPreChecks: ["AML", "SANCTIONS", "PEP", "VELOCITY", "DEVICE"]
  }
};
