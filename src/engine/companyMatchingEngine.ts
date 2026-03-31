// src/engine/companyMatchingEngine.ts
import { INDUSTRY_RULES, IndustryRuleConfig } from "./industryRules.js";
import { estimateSavings, SavingsEstimate } from "./savingsModel.js";

export interface CompanyMatchResult {
  company: string;
  matchedSector: IndustryRuleConfig | null;
  confidence: number;
  savings: SavingsEstimate;
  notes: string[];
}

interface CompanyPattern {
  keywords: string[];
  sectorName: string;
  baseConfidence: number;
}

const COMPANY_PATTERNS: CompanyPattern[] = [
  { keywords: ["home depot", "lowe"], sectorName: "Merchant Services", baseConfidence: 0.9 },
  { keywords: ["kroger", "walmart", "target"], sectorName: "Merchant Services", baseConfidence: 0.9 },
  { keywords: ["fedex", "ups", "dhl"], sectorName: "Supply Chain & Trade Finance", baseConfidence: 0.9 },
  { keywords: ["john deere", "caterpillar"], sectorName: "Embedded Finance", baseConfidence: 0.85 },
];

function normalize(text: string) {
  return text.trim().toLowerCase();
}

export function matchCompanyToSector(companyRaw: string): CompanyMatchResult {
  const company = companyRaw.trim();
  const norm = normalize(company);
  const notes: string[] = [];

  const pattern = COMPANY_PATTERNS.find(p =>
    p.keywords.some(k => norm.includes(k))
  );

  let matchedSector: IndustryRuleConfig | null = null;
  let confidence = 0.3;

  if (pattern) {
    matchedSector = INDUSTRY_RULES.find((r: IndustryRuleConfig) => r.name === pattern.sectorName) ?? null;
    confidence = pattern.baseConfidence;
    notes.push(`Matched by keyword pattern for sector "${pattern.sectorName}".`);
  }

  if (!matchedSector) {
    matchedSector =
      INDUSTRY_RULES.find((r: IndustryRuleConfig) => r.name === "Merchant Services") ?? INDUSTRY_RULES[0] ?? null;
    notes.push("Fell back to default sector based on trust-safe behavior.");
  }

  const savings = estimateSavings(matchedSector?.name ?? "");

  if (matchedSector?.supportsBankingDemo) {
    notes.push("This sector supports liquidity verification and risk scoring via the banking demo.");
  } else {
    notes.push("This sector does not expose the banking demo; trust is enforced via static rules and compliance.");
  }

  return { company, matchedSector, confidence, savings, notes };
}
