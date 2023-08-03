import express from "express";
import { addCountDays, getAllCounts } from "../controllers/countDaysController.js";

const router = express.Router();

router.route("/addcount").post( addCountDays );
router.route("/allcounts").get( getAllCounts );

export default router;