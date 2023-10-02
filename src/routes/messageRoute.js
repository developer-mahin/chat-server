const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const {
  authFilteringMiddleware,
} = require("../middleware/userFilteringMiddleware");

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
  "/seen_message",
  authFilteringMiddleware,
  messageController.seenMessage
);

router.post(
  "/delivered_message",
  authFilteringMiddleware,
  messageController.deliveredMessage
);

router.post(
  "/get__message/:id",
  authFilteringMiddleware,
  messageController.getMessage
);

module.exports = router;
