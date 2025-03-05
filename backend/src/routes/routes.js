import express from "express";
import { language,scenario,conversation } from "../controllers/routes.controllers";

const router=express.Router();

router.post('/language',language);

router.post('/scenario',scenario);

router.put('/ai-conversation',conversation);

export default router;