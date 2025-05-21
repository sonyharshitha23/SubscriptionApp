import express from "express";
const router = express.Router();
import { prices, createSubscription } from "../controllers/subs.js";
import { requireSignin } from "../middlewares/index.js";
router.get("/prices", prices);
router.post("/create-subscription", requireSignin, createSubscription);
export default router;
