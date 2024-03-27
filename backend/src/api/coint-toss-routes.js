import express from "express";
import auth from "../utils/auth.js";
import coinToss from "./coin-toss.js";
import lastTosses from "./last-tosses.js";

const router = express.Router();

router.post("/coinToss", auth, coinToss);
router.get("/lastTosses", auth, lastTosses);

export default router;
