import express from "express";
import { language, scenario, conversation } from "../controllers/routes.controllers.js"; 
import { setLanguage } from "../middleware/setLanguage.js"; 

const router = express.Router();

router.post('/language', setLanguage, language);
router.post('/scenario', scenario);
router.put('/ai-conversation', conversation);

export default router;
