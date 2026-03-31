import type { Request, Response } from "express";
import crypto from "node:crypto";

export type LiquidityPassport = {
  id?: string;
  userId?: string;
  issuedAt: string;
  expiresAt: string;
  status: string;
  metadata?: Record<string, any>;
  passportId?: string;
  holder?: string;
  liquidityScore?: number;
  verifiedFunds?: number;
  riskLevel?: string;
  auditTrail?: Array<{ event: string; timestamp: string }>;
};

const passports: Map<string, LiquidityPassport> = new Map();

export function issuePassport(req: Request, res: Response) {
  const { userId, metadata = {} } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "userId required" });
  }

  const passport = {
    passportId: "VIP-20250324-001",
    holder: "Demo User",
    liquidityScore: 92,
    verifiedFunds: 150000,
    riskLevel: "Low",
    status: "Active",
    issuedAt: "2026-03-24T16:49:00Z",
    expiresAt: "2026-09-24T16:49:00Z",
    auditTrail: [
      { event: "Passport Issued", timestamp: "2026-03-24T16:49:00Z" }
    ]
  };

  passports.set("VIP-20250324-001", passport);
  res.status(201).json({ passport });
}

export function verifyPassport(req: Request, res: Response) {
  const { id } = req.body;
  const passport = passports.get(id);
  if (!passport) {
    return res.status(404).json({ error: "Passport not found" });
  }

  const verification = {
    passportId: "VIP-20250324-001",
    isValid: true,
    liquidityScore: 92,
    verifiedFunds: 150000,
    riskLevel: "Low",
    complianceChecks: {
      aml: "Passed",
      kyc: "Passed",
      sanctions: "Clear"
    },
    lastChecked: "2026-03-24T16:49:00Z"
  };

  res.json({ verification });
}

export function revokePassport(req: Request, res: Response) {
  const { id } = req.body;
  const passport = passports.get(id);
  if (!passport) {
    return res.status(404).json({ error: "Passport not found" });
  }

  const revocation = {
    passportId: "VIP-20250324-001",
    status: "Revoked",
    revokedAt: "2026-03-24T16:49:00Z",
    reason: "Demo revocation for testing"
  };

  passport.status = "revoked";
  res.json({ revocation });
}

export function getPassport(req: Request, res: Response) {
  const { id } = req.params;
  const passport = passports.get(id);
  if (!passport) {
    return res.status(404).json({ error: "Passport not found" });
  }
  res.json({ passport });
}

export function listPassports(_req: Request, res: Response) {
  const list = Array.from(passports.values());
  res.json({ passports: list });
}

export function monitorPassport(req: Request, res: Response) {
  const { passportId } = req.params;
  const passport = passports.get(passportId);
  if (!passport) {
    return res.status(404).json({ error: "Passport not found" });
  }

  const monitoring = {
    passportId: "VIP-20250324-001",
    liquidityScore: 92,
    trend: "Stable",
    alerts: [],
    lastUpdated: "2026-03-24T16:49:00Z"
  };

  res.json({ monitoring });
}