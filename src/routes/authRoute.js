const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const upload = require("../middleware/fileUploadWithMulter");

router.post("/sign_up", upload.single("image"), userController.signUp);
router.post("/sign_in", userController.signIn);

router.get("/verify/:token", userController.verifyUser);

module.exports = router;
