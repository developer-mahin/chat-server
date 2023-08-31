const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

router.post("/sign_up", userController.signUp);
router.post("/sign_in", userController.signIn);

router.get("/verify/:token", userController.verifyUser);

module.exports = router;
