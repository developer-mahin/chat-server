const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authFilteringMiddleware,
} = require("../middleware/userFilteringMiddleware");
const { newMiddleWare } = require("../middleware/newMiddleware");

router.post("/all_user", authFilteringMiddleware, userController.getAllUser);
router.get(
  "/all_user/:token",
  newMiddleWare,
  userController.getAllUserWithGetMethod
);

module.exports = router;
