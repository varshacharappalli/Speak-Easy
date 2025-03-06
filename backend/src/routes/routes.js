import express from "express";
import { language, scenario } from "../controllers/routes.controllers.js"; 

const router = express.Router();

router.post('/language', language);
router.post('/scenario', scenario);
//router.get('/conversation', conversation);

export default router;
