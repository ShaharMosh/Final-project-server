import express from "express";
var router = express.Router();
import { checkToken } from "../controllers/resetPass.js";

router.route("/resetPass").post((req, res) => {
    checkToken(req, res);
  });

export default router;