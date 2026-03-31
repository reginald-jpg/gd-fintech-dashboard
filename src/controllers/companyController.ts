import { Request, Response } from "express";
import { MOCK_MODE } from "../config.js";
import { classifyCompany } from "../services/classifierService.js";

export async function matchCompany(req: Request, res: Response) {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Company name is required" });
    }

    let companyName = name;

    // Mock mode behavior
    if (MOCK_MODE) {
      console.log("MOCK MODE ACTIVE — overriding company name for demo");
      companyName = name; // You can override here if you want
    }

    const result = await classifyCompany(companyName);
    return res.json(result);

  } catch (err) {
    console.error("Error matching company:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
