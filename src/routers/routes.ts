import { Router } from "express";
import { SicCodeService } from "../services/SicCodeService";
import { SicSearchController } from "../controllers/SicSearchController";
import { HealthcheckController } from "../controllers/HealthcheckController";

const router = Router();

const sicCodeService = new SicCodeService();
const sicSearchController = new SicSearchController(sicCodeService);
const healthcheckController = new HealthcheckController();

router.get("/sic-code-search", sicSearchController.renderView);
router.post("/sic-code-search", sicSearchController.search);
router.get("/sic-code-search/healthcheck", healthcheckController.healthcheck);

export default router;
