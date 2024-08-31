import express from "express";
var router = express.Router();
import { getItemDetails } from "../controllers/itemDetails.js";

router.route("/ItemDetalis").post((req, res) => {
  getItemDetails(req, res);
});

export default router;
