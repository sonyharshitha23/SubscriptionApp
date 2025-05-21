import express from "express";
const router = express.Router();
import { prices } from "../controllers/subs.js";
router.get("/prices", prices);
export default router;
