import { Router } from "express";
import { SicCodeService } from "../services/SicCodeService";

import { SicSearchController } from "../controllers/SicSearchController";

const router = Router();

const sicCodeService = new SicCodeService();
const sicSearchController = new SicSearchController(sicCodeService);

router.get("/", sicSearchController.renderView);
router.post("/", sicSearchController.search);

export default router;
