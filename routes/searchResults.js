import express from "express";
var router = express.Router();
import {sendSearchResults} from "../controllers/searchResults.js";

router.route("/SearchResults").get((req, res) => {
    sendSearchResults(req, res);
  });

export default router;
