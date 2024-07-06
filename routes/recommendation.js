// routes/recommendationRoutes.js
import express from "express";
import { runRecommendationScripts } from "../controllers/recommendation.js";
var router = express.Router();

router.get("/recommendations", runRecommendationScripts);

export default router;
