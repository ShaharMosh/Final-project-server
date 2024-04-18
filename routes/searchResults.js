import express from "express";
var router = express.Router();
import { getSearchParmsFromUser } from "../controllers/searchResults.js";

router.route("/SearchResults").post((req, res) => {
  getSearchParmsFromUser(req, res);
});

export default router;
