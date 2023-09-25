const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const {
  authFilteringMiddleware,
} = require("../middleware/userFilteringMiddleware");
const uploadMessage = require("../middleware/fileUploadInMessage");
const { newMiddleWare } = require("../middleware/newMiddleware");

router.post(
  "/send_message",
  authFilteringMiddleware,
  messageController.sendMessage
);

router.post(
  "/send_img_message",
  authFilteringMiddleware,
  messageController.sendImageMessage
);

router.post(
  "/get__message/:id",
  authFilteringMiddleware,
  messageController.getMessage
);

module.exports = router;
