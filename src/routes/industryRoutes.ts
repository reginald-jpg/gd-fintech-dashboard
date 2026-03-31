// src/routes/industryRoutes.ts
import { Router } from "express";
import { getAllIndustries, getIndustryById } from "../controllers/industryController.js";

const router = Router();

router.get("/", getAllIndustries);
router.get("/:id", getIndustryById);

export default router;
