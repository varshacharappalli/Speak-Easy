import express from "express";
import { language, scenario, conversation } from "../controllers/routes.controllers.js"; 
import { setLanguage } from "../middleware/setLanguage.js"; 

const router = express.Router();

router.post('/language', language);
router.post('/scenario', scenario);
router.get('/conversation', conversation);

export default router;
