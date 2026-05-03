import express from "express";
import { getMassages, sendMassage } from "../controllers/massage.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();


router.get('/:id', protectRoute, getMassages);
router.post('/send/:id', protectRoute, sendMassage);

export default router;