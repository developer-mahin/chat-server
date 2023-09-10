const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authFilteringMiddleware } = require("../middleware/userFilteringMiddleware");

router.post("/all_user", authFilteringMiddleware, userController.getAllUser);

module.exports = router;
