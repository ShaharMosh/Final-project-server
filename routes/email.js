import express from "express";
var router = express.Router();
import { checkEmail } from "../controllers/email.js";

router.route("/email").post((req, res) => {
    checkEmail(req, res);
  });

export default router;