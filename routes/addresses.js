import express from "express";
import storeController from "../controllers/addresses.js";

const router = express.Router();

router.get("/stores/:store", storeController.getStoreByName);

export default router;
