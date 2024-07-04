import express from "express";
var router = express.Router();
import userController from "../controllers/user.js";

router.route("/Change").get((req, res) => {
  userController.getDetails(req, res);
});

router.route("/updateWishlist").post((req, res) => {
  
  userController.updateUserWishlist(req, res);
});

router.route("/getWishlist").get((req, res) => {
  userController.getWishlist(req, res);
});

router.route("/wishlistPage").get((req, res) => {
 
  userController.wishlistPage(req, res);
});

export default router;
