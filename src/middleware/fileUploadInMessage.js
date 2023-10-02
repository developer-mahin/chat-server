const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_MESSAGE);
  },

  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(
      null,
      Date.now() + "-" + file.originalname.repeat(extname, "") + extname
    );
  },
});

const uploadMessage = multer({ storage: storage });
module.exports = uploadMessage;
