// backend/src/controllers/industryController.ts

import { Request, Response } from "express";
import { industries } from "../data/industries.js";

// GET /api/industry
export const getAllIndustries = (req: Request, res: Response) => {
  try {
    return res.status(200).json(industries);
  } catch (error) {
    console.error("Error fetching industries:", error);
    return res.status(500).json({ error: "Failed to fetch industries" });
  }
};

// GET /api/industry/:id
export const getIndustryById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const industry = industries.find((i: (typeof industries)[number]) => i.id === id);

    if (!industry) {
      return res.status(404).json({ error: "Industry not found" });
    }

    return res.status(200).json(industry);
  } catch (error) {
    console.error("Error fetching industry:", error);
    return res.status(500).json({ error: "Failed to fetch industry" });
  }
};
