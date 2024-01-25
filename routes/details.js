import express from "express";
var router = express.Router();
import { updateUser } from "../controllers/details.js";

router.route("/Users/details").post((req, res) => {
    updateUser(req, res);
  });

export default router;
