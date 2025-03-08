import express from "express";
import { language, scenario,conversation, airesponse} from "../controllers/routes.controllers.js"; 
import { uploadMiddleware } from "../middleware/uploadAudio.js";

const router = express.Router();

router.post('/language', language);
router.post('/scenario', scenario);
router.post('/conversation', uploadMiddleware,conversation);
router.get('/airesponse',airesponse);

export default router;
