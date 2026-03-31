import { Router } from "express";
import {
  getIndustryRegulations,
  getIndustryCompliance,
  getIndustryRisk,
  getIndustryWorkflow,
  getIndustryExample,
  getIndustryRiskScore,
  getIndustryChecklist,
  getIndustryAutomation,
} from "../controllers/industryIntelligenceController.js";

const router = Router();

router.get("/industry/:sector/regulations", getIndustryRegulations);
router.get("/industry/:sector/compliance", getIndustryCompliance);
router.get("/industry/:sector/risk", getIndustryRisk);
router.get("/industry/:sector/workflow", getIndustryWorkflow);
router.get("/industry/:sector/example", getIndustryExample);
router.get("/industry/:sector/risk-score", getIndustryRiskScore);
router.get("/industry/:sector/checklist", getIndustryChecklist);
router.get("/industry/:sector/automation", getIndustryAutomation);

export default router;