import express from "express";
var router = express.Router();
import { getItemDetails } from "../controllers/itemDetails.js";

router.route("/ItemDetalis").post((req, res) => {
  console.log("ItemDetalis-route");
  getItemDetails(req, res);
});

export default router;