import { Router } from "express";
import { getPassport, issuePassport, listPassports, revokePassport, verifyPassport, monitorPassport } from "../controllers/liquidityPassportController.js";

export const liquidityPassportRouter = Router();

liquidityPassportRouter.post("/passport/issue", issuePassport);
liquidityPassportRouter.post("/passport/verify", verifyPassport); // Note: this might need body for id, but keeping simple
liquidityPassportRouter.post("/passport/revoke", revokePassport);
liquidityPassportRouter.get("/passport/monitor/:passportId", monitorPassport);
liquidityPassportRouter.get("/passport/:id", getPassport);
liquidityPassportRouter.get("/passports", listPassports);