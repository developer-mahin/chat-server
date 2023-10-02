const Message = require("../models/messageModel");

exports.sendMessage = async (req, res, next) => {
  try {
    const { senderName, receiverId, message } = req.body;
    const senderId = req.myId;

    const insetMessage = await Message.create({
      senderId,
      senderName,
      receiverId,
      message: {
        text: message,
        image: "",
      },
    });

    console.log(insetMessage);

    res.status(201).json({
      success: true,
      message: insetMessage,
    });
  } catch (error) {
    next(error);
  }
};

exports.sendImageMessage = async (req, res, next) => {
  try {
    const senderId = req.myId;
    const { senderName, receiverId, image } = req.body;

    const insetMessage = await Message.create({
      senderId,
      senderName,
      receiverId,
      message: {
        text: "",
        image: image,
      },
    });

    res.status(201).json({
      success: true,
      message: insetMessage,
    });
  } catch (error) {
    next(error);
  }
};

exports.seenMessage = async (req, res, next) => {
  const messageId = req.body._id;
  await Message.findByIdAndUpdate(messageId, { status: "seen" })
    .then(() => {
      res.status(201).json({
        success: true,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deliveredMessage = async (req, res, next) => {
  const messageId = req.body._id;
  await Message.findByIdAndUpdate(messageId, { status: "delivered" })
    .then(() => {
      res.status(201).json({
        success: true,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getMessage = async (req, res, next) => {
  try {
    const { id: friendId } = req.params;
    const myId = req.myId;

    let getAllMessage = await Message.find({
      $or: [
        {
          $and: [
            { senderId: { $eq: myId } },
            { receiverId: { $eq: friendId } },
          ],
        },
        {
          $and: [
            { senderId: { $eq: friendId } },
            { receiverId: { $eq: myId } },
          ],
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: getAllMessage,
    });
  } catch (error) {
    next(error);
  }
};
