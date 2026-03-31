export const industries = [
  {
    id: "banking-payments",
    name: "Banking & Payments",
    description: "Retail banking, digital payments, and financial transaction processing.",
    typicalUseCases: ["Payments", "Fraud Detection", "KYC Automation"],
    sampleCompanies: ["Chase", "Stripe", "Square"],
    riskProfile: "medium",
    dataSignals: ["transaction volume", "fraud rate", "KYC flags"],
    modelNotes: ["Requires PCI compliance", "High-volume real-time scoring"]
  },
  {
    id: "insurance",
    name: "Insurance",
    description: "Underwriting, claims processing, and risk modeling.",
    typicalUseCases: ["Claims Automation", "Risk Scoring", "Policy Pricing"],
    sampleCompanies: ["AIG", "State Farm", "Allstate"],
    riskProfile: "medium",
    dataSignals: ["claim frequency", "loss ratios", "policyholder data"],
    modelNotes: ["Requires actuarial alignment", "High regulatory oversight"]
  },
  {
    id: "government-identity",
    name: "Government & Digital Identity",
    description: "Identity verification, licensing, and public digital services.",
    typicalUseCases: ["ID Verification", "Fraud Prevention", "Citizen Services"],
    sampleCompanies: ["ID.me", "Experian", "LexisNexis"],
    riskProfile: "high",
    dataSignals: ["identity attributes", "verification logs", "document scans"],
    modelNotes: ["Strict compliance", "High sensitivity data"]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Clinical systems, patient data, and medical billing.",
    typicalUseCases: ["Claims Processing", "Care Recommendations", "Billing Automation"],
    sampleCompanies: ["Epic", "Cerner", "UnitedHealth"],
    riskProfile: "high",
    dataSignals: ["EHR data", "claims", "diagnostic codes"],
    modelNotes: ["HIPAA required", "High data sensitivity"]
  },
  {
    id: "education",
    name: "Education",
    description: "Learning systems, student analytics, and credentialing.",
    typicalUseCases: ["Student Risk Scoring", "Adaptive Learning", "Credential Verification"],
    sampleCompanies: ["Coursera", "Chegg", "Pearson"],
    riskProfile: "low",
    dataSignals: ["attendance", "grades", "engagement metrics"],
    modelNotes: ["Moderate privacy requirements"]
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Property valuation, mortgage systems, and rental platforms.",
    typicalUseCases: ["Valuation Models", "Tenant Screening", "Market Forecasting"],
    sampleCompanies: ["Zillow", "Redfin", "Opendoor"],
    riskProfile: "medium",
    dataSignals: ["property data", "market trends", "credit data"],
    modelNotes: ["Requires MLS integrations"]
  },
  {
    id: "transportation",
    name: "Transportation",
    description: "Logistics, fleet management, and mobility services.",
    typicalUseCases: ["Route Optimization", "Fleet Analytics", "Demand Forecasting"],
    sampleCompanies: ["Uber", "Lyft", "FedEx"],
    riskProfile: "medium",
    dataSignals: ["GPS data", "fuel usage", "delivery times"],
    modelNotes: ["Real-time data required"]
  },
  {
    id: "utilities",
    name: "Utilities",
    description: "Energy distribution, water systems, and grid analytics.",
    typicalUseCases: ["Load Forecasting", "Outage Prediction", "Billing"],
    sampleCompanies: ["Duke Energy", "PG&E", "National Grid"],
    riskProfile: "high",
    dataSignals: ["meter data", "grid load", "weather"],
    modelNotes: ["Critical infrastructure"]
  },
  {
    id: "telecom",
    name: "Telecommunications",
    description: "Network operations, customer analytics, and billing.",
    typicalUseCases: ["Churn Prediction", "Network Optimization", "Fraud Detection"],
    sampleCompanies: ["AT&T", "Verizon", "T-Mobile"],
    riskProfile: "medium",
    dataSignals: ["call detail records", "network logs", "billing data"],
    modelNotes: ["High-volume data"]
  },
  {
    id: "legal-justice",
    name: "Legal & Justice",
    description: "Case management, legal analytics, and compliance.",
    typicalUseCases: ["Case Routing", "Document Analysis", "Risk Scoring"],
    sampleCompanies: ["Relativity", "Thomson Reuters", "LexisNexis"],
    riskProfile: "high",
    dataSignals: ["case files", "court records", "legal documents"],
    modelNotes: ["Strict privacy and ethics"]
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Production systems, supply chain, and quality control.",
    typicalUseCases: ["Predictive Maintenance", "Quality Scoring", "Demand Forecasting"],
    sampleCompanies: ["GE", "Siemens", "Bosch"],
    riskProfile: "medium",
    dataSignals: ["sensor data", "production logs", "inventory"],
    modelNotes: ["IoT-heavy environment"]
  },
  {
    id: "retail",
    name: "Retail & E‑Commerce",
    description: "Merchandising, customer analytics, and supply chain.",
    typicalUseCases: ["Recommendation Engines", "Inventory Forecasting", "Fraud Detection"],
    sampleCompanies: ["Amazon", "Walmart", "Target"],
    riskProfile: "low",
    dataSignals: ["transactions", "clickstream", "inventory"],
    modelNotes: ["High-volume consumer data"]
  },
  {
    id: "energy",
    name: "Energy",
    description: "Oil, gas, renewables, and energy trading.",
    typicalUseCases: ["Load Forecasting", "Trading Models", "Equipment Monitoring"],
    sampleCompanies: ["Shell", "BP", "Exxon"],
    riskProfile: "high",
    dataSignals: ["market data", "sensor data", "weather"],
    modelNotes: ["High volatility"]
  },
  {
    id: "agriculture",
    name: "Agriculture & Food Supply",
    description: "Crop analytics, supply chain, and sustainability.",
    typicalUseCases: ["Yield Prediction", "Soil Analysis", "Supply Optimization"],
    sampleCompanies: ["John Deere", "Cargill", "Bayer"],
    riskProfile: "low",
    dataSignals: ["soil data", "weather", "satellite imagery"],
    modelNotes: ["Seasonal variability"]
  },
  {
    id: "media",
    name: "Media & Entertainment",
    description: "Content platforms, streaming analytics, and audience insights.",
    typicalUseCases: ["Recommendation Engines", "Ad Targeting", "Engagement Scoring"],
    sampleCompanies: ["Netflix", "Disney", "Spotify"],
    riskProfile: "low",
    dataSignals: ["viewing data", "engagement", "ad metrics"],
    modelNotes: ["High personalization"]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description: "Threat detection, identity protection, and security analytics.",
    typicalUseCases: ["Threat Scoring", "Anomaly Detection", "Access Monitoring"],
    sampleCompanies: ["CrowdStrike", "Palo Alto Networks", "Okta"],
    riskProfile: "high",
    dataSignals: ["logs", "auth events", "network traffic"],
    modelNotes: ["High-risk domain"]
  },
  {
    id: "nonprofit",
    name: "Nonprofit & Social Impact",
    description: "Grant management, donor analytics, and program evaluation.",
    typicalUseCases: ["Donor Scoring", "Impact Measurement", "Fraud Detection"],
    sampleCompanies: ["UNICEF", "Red Cross", "United Way"],
    riskProfile: "low",
    dataSignals: ["donor data", "program metrics", "financials"],
    modelNotes: ["High transparency needs"]
  },

  // --- ADVANCED / GLOBAL SECTORS ---

  {
    id: "maritime",
    name: "Maritime & Shipping",
    description: "Global shipping, port logistics, and fleet operations.",
    typicalUseCases: ["Route Optimization", "Fuel Efficiency", "Risk Scoring"],
    sampleCompanies: ["Maersk", "CMA CGM", "Hapag-Lloyd"],
    riskProfile: "medium",
    dataSignals: ["AIS data", "weather", "fuel usage"],
    modelNotes: ["Global operations"]
  },
  {
    id: "aerospace",
    name: "Space & Aerospace",
    description: "Satellite systems, aviation analytics, and mission operations.",
    typicalUseCases: ["Trajectory Modeling", "Fuel Optimization", "Risk Scoring"],
    sampleCompanies: ["SpaceX", "Boeing", "Airbus"],
    riskProfile: "high",
    dataSignals: ["telemetry", "weather", "flight logs"],
    modelNotes: ["Mission-critical"]
  },
  {
    id: "ai-governance",
    name: "AI Governance & Model Compliance",
    description: "Model risk management, compliance, and auditability.",
    typicalUseCases: ["Bias Detection", "Model Monitoring", "Explainability"],
    sampleCompanies: ["Fiddler", "Arthur AI", "Truera"],
    riskProfile: "high",
    dataSignals: ["model outputs", "training data", "audit logs"],
    modelNotes: ["Regulatory heavy"]
  },
  {
    id: "defense",
    name: "Defense & Military Systems",
    description: "Mission systems, intelligence analytics, and logistics.",
    typicalUseCases: ["Threat Detection", "Logistics Planning", "Simulation"],
    sampleCompanies: ["Lockheed Martin", "Raytheon", "Northrop Grumman"],
    riskProfile: "high",
    dataSignals: ["sensor data", "intel feeds", "mission logs"],
    modelNotes: ["Top security clearance"]
  },
  {
    id: "energy-trading",
    name: "Energy Trading & Grid Intelligence",
    description: "Energy markets, grid optimization, and forecasting.",
    typicalUseCases: ["Market Forecasting", "Load Balancing", "Risk Scoring"],
    sampleCompanies: ["Enron (historical)", "Shell Trading", "BP Trading"],
    riskProfile: "high",
    dataSignals: ["market data", "grid load", "weather"],
    modelNotes: ["High volatility"]
  },

  // --- REMAINING SECTORS TO COMPLETE 36 ---

  {
    id: "hospitality",
    name: "Hospitality & Travel",
    description: "Hotels, travel platforms, and guest analytics.",
    typicalUseCases: ["Demand Forecasting", "Dynamic Pricing", "Churn Scoring"],
    sampleCompanies: ["Airbnb", "Marriott", "Hilton"],
    riskProfile: "low",
    dataSignals: ["booking data", "seasonality", "reviews"],
    modelNotes: ["High seasonality"]
  },
  {
    id: "automotive",
    name: "Automotive & EV",
    description: "Vehicle systems, EV analytics, and mobility data.",
    typicalUseCases: ["Battery Health", "Predictive Maintenance", "Driver Scoring"],
    sampleCompanies: ["Tesla", "Ford", "GM"],
    riskProfile: "medium",
    dataSignals: ["telemetry", "charging data", "sensor logs"],
    modelNotes: ["IoT-heavy"]
  },
  {
    id: "pharmaceutical",
    name: "Pharmaceuticals",
    description: "Drug development, clinical trials, and supply chain.",
    typicalUseCases: ["Trial Analytics", "Risk Scoring", "Supply Forecasting"],
    sampleCompanies: ["Pfizer", "Moderna", "Roche"],
    riskProfile: "high",
    dataSignals: ["trial data", "lab results", "supply chain"],
    modelNotes: ["Regulated environment"]
  },
  {
    id: "mining",
    name: "Mining & Natural Resources",
    description: "Extraction, logistics, and commodity forecasting.",
    typicalUseCases: ["Yield Prediction", "Equipment Monitoring", "Risk Scoring"],
    sampleCompanies: ["Rio Tinto", "BHP", "Vale"],
    riskProfile: "high",
    dataSignals: ["sensor data", "geological data", "market data"],
    modelNotes: ["High environmental impact"]
  },
  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    description: "Warehousing, freight, and global supply optimization.",
    typicalUseCases: ["Route Planning", "Inventory Forecasting", "Risk Scoring"],
    sampleCompanies: ["DHL", "UPS", "Amazon Logistics"],
    riskProfile: "medium",
    dataSignals: ["GPS", "inventory", "delivery times"],
    modelNotes: ["Global dependencies"]
  },
  {
    id: "food-beverage",
    name: "Food & Beverage",
    description: "Production, distribution, and retail analytics.",
    typicalUseCases: ["Demand Forecasting", "Quality Scoring", "Supply Optimization"],
    sampleCompanies: ["Coca-Cola", "PepsiCo", "Nestlé"],
    riskProfile: "low",
    dataSignals: ["sales", "inventory", "quality metrics"],
    modelNotes: ["High volume"]
  },
  {
    id: "fashion",
    name: "Fashion & Apparel",
    description: "Retail, supply chain, and trend forecasting.",
    typicalUseCases: ["Trend Prediction", "Inventory Planning", "Personalization"],
    sampleCompanies: ["Nike", "H&M", "Zara"],
    riskProfile: "low",
    dataSignals: ["sales", "social trends", "inventory"],
    modelNotes: ["Fast-moving"]
  },
  {
    id: "sports",
    name: "Sports & Performance Analytics",
    description: "Athlete analytics, fan engagement, and operations.",
    typicalUseCases: ["Performance Scoring", "Injury Prediction", "Fan Analytics"],
    sampleCompanies: ["NBA", "NFL", "ESPN"],
    riskProfile: "low",
    dataSignals: ["biometric data", "game stats", "engagement"],
    modelNotes: ["High variability"]
  },
  {
    id: "human-resources",
    name: "Human Resources & Workforce",
    description: "Hiring, retention, and workforce analytics.",
    typicalUseCases: ["Attrition Prediction", "Candidate Scoring", "Scheduling"],
    sampleCompanies: ["Workday", "ADP", "BambooHR"],
    riskProfile: "medium",
    dataSignals: ["attendance", "performance", "engagement"],
    modelNotes: ["Ethical considerations"]
  },
  {
    id: "finance-investments",
    name: "Finance & Investments",
    description: "Asset management, trading, and portfolio analytics.",
    typicalUseCases: ["Risk Scoring", "Portfolio Optimization", "Forecasting"],
    sampleCompanies: ["BlackRock", "Vanguard", "Goldman Sachs"],
    riskProfile: "high",
    dataSignals: ["market data", "portfolio data", "economic indicators"],
    modelNotes: ["High volatility"]
  },
  {
    id: "construction",
    name: "Construction & Infrastructure",
    description: "Project management, safety analytics, and cost forecasting.",
    typicalUseCases: ["Risk Scoring", "Cost Estimation", "Scheduling"],
    sampleCompanies: ["Bechtel", "Fluor", "Skanska"],
    riskProfile: "medium",
    dataSignals: ["project data", "safety logs", "materials"],
    modelNotes: ["High cost variability"]
  },
  {
    id: "environmental",
    name: "Environmental & Sustainability",
    description: "Carbon tracking, ESG analytics, and sustainability scoring.",
    typicalUseCases: ["Carbon Modeling", "ESG Scoring", "Impact Forecasting"],
    sampleCompanies: ["Watershed", "Sustainalytics", "Climeworks"],
    riskProfile: "low",
    dataSignals: ["emissions", "energy usage", "supply chain"],
    modelNotes: ["Regulatory growth"]
  }
];
