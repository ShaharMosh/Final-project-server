import express from "express";
var router = express.Router();
import { login } from "../controllers/userLogin.js";

router.route("/Tokens").post((req, res) => {
  login(req, res);
});

export default router;
