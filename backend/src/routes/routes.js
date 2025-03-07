import express from "express";
import { language, scenario,conversation} from "../controllers/routes.controllers.js"; 
import { uploadMiddleware } from "../middleware/uploadAudio.js";

const router = express.Router();

router.post('/language', language);
router.post('/scenario', scenario);
router.post('/conversation', uploadMiddleware,conversation);

export default router;
