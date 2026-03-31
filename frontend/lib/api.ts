const BASE_URL = "http://localhost:8080/api";

export type CompanyMatchResponse = {
  companyName: string;
  matchedIndustryId: string;
  matchedIndustryName: string;
  confidence: number;
  estimatedAnnualSavings: number;
  savingsNotes: string[];
  notes: string[];
  trust: {
    riskLevel: string;
    rationale: string;
    dataFreshnessDays: number;
  };
};

// Company Match
export async function matchCompany(companyName: string, industryId?: string) {
  const res = await fetch(`${BASE_URL}/company/match`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ companyName, industryId }),
  });

  if (!res.ok) throw new Error("Failed to match company");
  return res.json() as Promise<CompanyMatchResponse>;
}

// Fetch all sectors (intel API)
export async function fetchSectors() {
  const res = await fetch(`${BASE_URL}/intel/sectors`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch sectors");
  return res.json();
}

// Fetch sector by ID (intel API)
export async function fetchSectorById(id: string) {
  const res = await fetch(`${BASE_URL}/intel/sectors/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch sector");
  return res.json();
}
