// src/types/intel.ts
export interface CompanyMatchRequest {
  companyName: string;
  industryId?: string; // optional override / demo mode
}

export interface TrustMetadata {
  riskLevel: 'low' | 'medium' | 'high';
  rationale: string;
  dataFreshnessDays: number;
}

export interface CompanyMatchResponse {
  companyName: string;
  matchedIndustryId: string;
  matchedIndustryName: string;
  confidence: number; // 0–1
  estimatedAnnualSavings: number; // in USD
  savingsNotes: string;
  notes: string[];
  trust: TrustMetadata;
}

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
