import { Router } from "express";
import { getSector, getSectorDetails, listSectors, simulateSector } from "../controllers/sectorsController.js";

export const sectorsRouter = Router();

sectorsRouter.get("/sectors", listSectors);
sectorsRouter.get("/sectors/:id", getSector);
sectorsRouter.get("/sectors/:id/details", getSectorDetails);
sectorsRouter.post("/sectors/:id/simulate", simulateSector);
