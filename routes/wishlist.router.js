const express = require("express");

const verifyUser = require("../middleware/verifyuser");
const {
  createWishlistHandler,
  deleteWishlistHandler,
  getWishlistHandler,
} = require("../controllers/wishlistController");

const router = express.Router();

router.route("/").post(verifyUser, createWishlistHandler);

router.route("/:id").delete(verifyUser, deleteWishlistHandler);

router.route("/").get(verifyUser, getWishlistHandler);

module.exports = router;
