// routes/recommendationRoutes.js
import express from 'express';
import { runRecommendationScripts } from '../controllers/recommendation.js';
var router = express.Router();

console.log("routes1")

router.get('/recommendations', runRecommendationScripts);

console.log("routes2")
export default router;
