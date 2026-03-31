export const modules = [
  {
    id: "company-match",
    name: "Company Match",
    description: "Matches a company to its sector, risk profile, and savings potential.",
    status: "active",
    endpoints: ["/api/company/match"],
    inputs: ["companyName"],
    outputs: ["sector", "risk", "savings"]
  },
  {
    id: "sector-intelligence",
    name: "Sector Intelligence",
    description: "Provides detailed insights for each of the 36 sectors.",
    status: "active",
    endpoints: ["/api/intel/sectors", "/api/intel/sectors/:id"],
    inputs: ["sectorId"],
    outputs: ["sectorDetails"]
  },
  {
    id: "monitoring",
    name: "Monitoring",
    description: "Tracks engine uptime, latency, and performance.",
    status: "active",
    endpoints: ["/api/monitoring"],
    inputs: [],
    outputs: ["engineStatus"]
  },
  {
    id: "governance",
    name: "Governance",
    description: "Controls trust layer policies and model governance.",
    status: "active",
    endpoints: ["/api/governance"],
    inputs: ["policy updates"],
    outputs: ["policy state"]
  }
];
