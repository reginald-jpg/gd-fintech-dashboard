// src/routes/companyRoutes.ts
import express from "express";
import { matchCompany } from "../controllers/companyController.js";

const router = express.Router();

router.post("/match", matchCompany);

export default router;
