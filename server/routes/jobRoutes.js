import express from "express";
import { postJob, getAllSpecialists } from "../controllers/jobController.js";

const router = express.Router();

router.route("/postjob").post( postJob );
router.route("/specialists").get( getAllSpecialists );
     
export default router;    