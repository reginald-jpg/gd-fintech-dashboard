import type { Request, Response } from "express";

export type Sector = {
  id: string;
  name: string;
  description: string;
};

const sectors: Sector[] = [
  { id: "1", name: "Payments", description: "Payment processing and settlement." },
  { id: "2", name: "Lending", description: "Loans, credit and consumer lending." },
  { id: "3", name: "WealthTech", description: "Investment and wealth management." },
  { id: "4", name: "InsurTech", description: "Insurance technology solutions." },
  { id: "5", name: "RegTech", description: "Regulatory technology and compliance monitoring." },
  { id: "6", name: "Blockchain", description: "Distributed ledger and blockchain services." },
  { id: "7", name: "Digital Banking", description: "Online banking and neo-banks." },
  { id: "8", name: "Neobanking", description: "Challenger banks and digital-only banks." },
  { id: "9", name: "Personal Finance", description: "Budgeting and personal finance management." },
  { id: "10", name: "B2B Banking", description: "Business banking services and platforms." },
  { id: "11", name: "Capital Markets", description: "Trading and market infrastructure." },
  { id: "12", name: "Credit Scoring", description: "Risk scoring and credit analytics." },
  { id: "13", name: "Identity", description: "Identity verification and KYC solutions." },
  { id: "14", name: "Fraud Prevention", description: "Fraud detection and prevention tech." },
  { id: "15", name: "Open Banking", description: "Open APIs and data sharing." },
  { id: "16", name: "API Banking", description: "Banking APIs and integration tools." },
  { id: "17", name: "Crowdfunding", description: "Crowdsourced funding platforms." },
  { id: "18", name: "Crypto Services", description: "Cryptocurrency trading and custody." },
  { id: "19", name: "Embedded Finance", description: "Financial services in non-financial apps." },
  { id: "20", name: "SME Finance", description: "Small and medium enterprise financing." },
  { id: "21", name: "Budgeting", description: "Financial planning and budgeting tools." },
  { id: "22", name: "Invoice Finance", description: "Invoice factoring and financing." },
  { id: "23", name: "Alternative Finance", description: "Peer-to-peer and alternative credit." },
  { id: "24", name: "Wealth Management", description: "Portfolio management and robo-advisors." },
  { id: "25", name: "Tax Tech", description: "Tax compliance and automation." },
  { id: "26", name: "PayTech", description: "Payments innovation and gateways." },
  { id: "27", name: "Data Analytics", description: "Analytics, business intelligence and reporting." },
  { id: "28", name: "API Security", description: "Security for financial APIs." },
  { id: "29", name: "Digital Identity", description: "Identity management and auth tools." },
  { id: "30", name: "Trade Finance", description: "International trade and supply chain finance." },
  { id: "31", name: "Pension Tech", description: "Retirement planning and pension systems." },
  { id: "32", name: "Real Estate FinTech", description: "Mortgage and property finance." },
  { id: "33", name: "Sustainable Finance", description: "ESG and green finance." },
  { id: "34", name: "Cash Management", description: "Treasury and cash operations." },
  { id: "35", name: "Financial Inclusion", description: "Access for underbanked markets." },
  { id: "36", name: "Mobile Finance", description: "Mobile wallets and banking apps." }
];

export function listSectors(_req: Request, res: Response) {
  res.json({ sectors });
}

export function getSector(req: Request, res: Response) {
  const { id } = req.params;
  const sector = sectors.find((s) => s.id === id);
  if (!sector) {
    return res.status(404).json({ error: "Sector not found" });
  }
  res.json({ sector });
}

export function getSectorDetails(req: Request, res: Response) {
  const { id } = req.params;
  const sector = sectors.find((s) => s.id === id);
  if (!sector) {
    return res.status(404).json({ error: "Sector not found" });
  }
  // Mock additional details for demo
  const details = {
    ...sector,
    marketSize: `$${Math.floor(Math.random() * 1000) + 100}B`,
    growthRate: `${(Math.random() * 20 + 5).toFixed(1)}%`,
    keyPlayers: ["Company A", "Company B", "Company C"],
    challenges: ["Regulation", "Security", "Adoption"]
  };
  res.json({ sector: details });
}

export function simulateSector(req: Request, res: Response) {
  const { id } = req.params;
  const sector = sectors.find((s) => s.id === id);
  if (!sector) {
    return res.status(404).json({ error: "Sector not found" });
  }

  let simulation: any = {};

  switch (id) {
    case "1": // Payments
      simulation = {
        transactionAmount: 100,
        fee: 2.5,
        netAmount: 97.5,
        status: "Processed",
        message: "Payment processed successfully with standard fee."
      };
      break;
    case "2": // Lending
      simulation = {
        loanAmount: 50000,
        interestRate: 5.5,
        term: 60,
        monthlyPayment: 956.07,
        approval: "Approved",
        riskScore: 750
      };
      break;
    case "3": // WealthTech
      simulation = {
        portfolioValue: 100000,
        allocation: { stocks: 60, bonds: 30, cash: 10 },
        projectedReturn: 7.2,
        recommendation: "Diversify into emerging markets"
      };
      break;
    case "4": // InsurTech
      simulation = {
        coverageType: "Auto",
        premium: 120,
        deductible: 500,
        quote: "Standard coverage approved"
      };
      break;
    case "5": // RegTech
      simulation = {
        complianceCheck: "Passed",
        violations: 0,
        recommendations: ["Update AML policies", "Enhance monitoring"]
      };
      break;
    case "6": // Blockchain
      simulation = {
        transactionHash: "0x" + Math.random().toString(16).substr(2, 64),
        confirmations: 12,
        status: "Confirmed"
      };
      break;
    case "7": // Digital Banking
      simulation = {
        accountBalance: 15420.50,
        recentTransactions: 3,
        alerts: ["Low balance warning"]
      };
      break;
    case "8": // Neobanking
      simulation = {
        userOnboarding: "Completed",
        features: ["Instant transfers", "Cashback rewards"],
        satisfaction: 4.8
      };
      break;
    case "9": // Personal Finance
      simulation = {
        budgetAnalysis: "On track",
        savingsGoal: 10000,
        progress: 75,
        tips: ["Reduce dining out expenses"]
      };
      break;
    case "10": // B2B Banking
      simulation = {
        invoiceFinancing: "Approved",
        amount: 25000,
        fee: 500,
        payout: 24500
      };
      break;
    case "11": // Capital Markets
      simulation = {
        tradeVolume: 1000000,
        price: 150.25,
        change: +2.5,
        recommendation: "Buy"
      };
      break;
    case "12": // Credit Scoring
      simulation = {
        score: 720,
        factors: ["Payment history", "Credit utilization"],
        improvement: "Pay down debt"
      };
      break;
    case "13": // Identity
      simulation = {
        verification: "Passed",
        confidence: 95,
        method: "Biometric"
      };
      break;
    case "14": // Fraud Prevention
      simulation = {
        riskScore: 15,
        flagged: false,
        actions: ["Monitor transaction"]
      };
      break;
    case "15": // Open Banking
      simulation = {
        dataShared: ["Transactions", "Balances"],
        consents: 5,
        status: "Active"
      };
      break;
    case "16": // API Banking
      simulation = {
        endpoints: 25,
        uptime: 99.9,
        calls: 15000
      };
      break;
    case "17": // Crowdfunding
      simulation = {
        campaignGoal: 50000,
        raised: 35000,
        backers: 120,
        status: "Active"
      };
      break;
    case "18": // Crypto Services
      simulation = {
        balance: 2.5,
        value: 75000,
        volatility: "High",
        advice: "HODL"
      };
      break;
    case "19": // Embedded Finance
      simulation = {
        integrations: 10,
        revenue: 500000,
        growth: 25
      };
      break;
    case "20": // SME Finance
      simulation = {
        loanApproved: true,
        amount: 100000,
        terms: "5 years",
        rate: 6.5
      };
      break;
    case "21": // Budgeting
      simulation = {
        monthlyBudget: 3000,
        spent: 2100,
        remaining: 900,
        status: "Under budget"
      };
      break;
    case "22": // Invoice Finance
      simulation = {
        invoiceValue: 15000,
        advance: 80,
        fee: 300,
        payout: 11700
      };
      break;
    case "23": // Alternative Finance
      simulation = {
        peerLoan: "Matched",
        amount: 5000,
        rate: 8.5,
        term: 12
      };
      break;
    case "24": // Wealth Management
      simulation = {
        assets: 500000,
        allocation: { equities: 50, fixed: 30, alternatives: 20 },
        performance: 8.2
      };
      break;
    case "25": // Tax Tech
      simulation = {
        taxLiability: 25000,
        deductions: 5000,
        refund: 2000,
        status: "Filed"
      };
      break;
    case "26": // PayTech
      simulation = {
        paymentMethods: ["Card", "ACH", "Crypto"],
        successRate: 98.5,
        volume: 1000000
      };
      break;
    case "27": // Data Analytics
      simulation = {
        insights: 150,
        accuracy: 92,
        trends: ["Increasing mobile usage"]
      };
      break;
    case "28": // API Security
      simulation = {
        threats: 5,
        blocked: 5,
        compliance: "GDPR compliant"
      };
      break;
    case "29": // Digital Identity
      simulation = {
        identities: 10000,
        verified: 9500,
        breaches: 0
      };
      break;
    case "30": // Trade Finance
      simulation = {
        shipmentValue: 100000,
        financing: 80,
        risk: "Low",
        approved: true
      };
      break;
    case "31": // Pension Tech
      simulation = {
        balance: 200000,
        contributions: 500,
        projections: 400000
      };
      break;
    case "32": // Real Estate FinTech
      simulation = {
        propertyValue: 300000,
        mortgage: 240000,
        rate: 4.5,
        approval: "Conditional"
      };
      break;
    case "33": // Sustainable Finance
      simulation = {
        esgScore: 85,
        investments: 100000,
        impact: "Positive"
      };
      break;
    case "34": // Cash Management
      simulation = {
        balance: 50000,
        forecasts: [52000, 54000],
        recommendations: ["Invest surplus"]
      };
      break;
    case "35": // Financial Inclusion
      simulation = {
        users: 5000,
        access: 90,
        barriers: ["Documentation"]
      };
      break;
    case "36": // Mobile Finance
      simulation = {
        users: 100000,
        transactions: 50000,
        adoption: 75
      };
      break;
    default:
      simulation = { message: "Simulation not available" };
  }

  res.json({ sector: sector.name, simulation });
}
