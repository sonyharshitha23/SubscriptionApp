import express from "express";
const router = express.Router();
import {
  prices,
  createSubscription,
  subscriptionStatus,
  subscriptions,
  customerPortal,
} from "../controllers/subs.js";
import { requireSignin } from "../middlewares/index.js";
router.get("/prices", prices);
router.post("/create-subscription", requireSignin, createSubscription);
router.get("/subscription-status", requireSignin, subscriptionStatus);
router.get("/subscriptions", requireSignin, subscriptions);
router.get("/customer-portal", requireSignin, customerPortal);
export default router;
