import express from "express";
var router = express.Router();
import { updatePassword } from "../controllers/password.js";

router.route("/Users/password").post((req, res) => {
  updatePassword(req, res);
});

export default router;
