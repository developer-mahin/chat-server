const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    message: {
      text: {
        type: String,
        default: "",
      },
      image: {
        type: String,
        default: "",
      },
    },
    status: {
      type: String,
      default: "unseen",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
