// src/routes/intel.ts

import { Router } from 'express';
import { matchCompanyToIndustry } from "../engine/industryRules.js";
import { estimateSavings } from "../engine/savingsModel.js";
import { getAllIndustries, getIndustryById } from "../engine/industryCatalog.js";

const router = Router();

/**
 * POST /api/intel/match
 * Matches a company name to an industry and returns savings estimates.
 */
router.post('/intel/match', (req, res) => {
  const { companyName, industryId } = req.body;

  if (!companyName) {
    return res.status(400).json({ error: 'companyName is required' });
  }

  const match = matchCompanyToIndustry(companyName, industryId);
  const savings = estimateSavings(match.industryId);

  return res.json({
    companyName,
    matchedIndustryId: match.industryId,
    matchedIndustryName: match.industryName,
    confidence: match.confidence,
    estimatedAnnualSavings: savings.amount,
    savingsNotes: savings.notes,
    notes: match.notes,
    trust: match.trust
  });
});

/**
 * GET /api/intel/sectors
 * Returns all industries (string IDs).
 */
router.get('/intel/sectors', (_req, res) => {
  const sectors = getAllIndustries();
  return res.json(sectors);
});

/**
 * GET /api/intel/sectors/:id
 * Returns a single industry by string ID.
 */
router.get('/intel/sectors/:id', (req, res) => {
  const id = req.params.id; // IMPORTANT: string ID, not number

  const sector = getIndustryById(id);

  if (!sector) {
    return res.status(404).json({ error: 'Sector not found' });
  }

  return res.json(sector);
});

export default router;
