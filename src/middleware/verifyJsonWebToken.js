const jwt = require("jsonwebtoken")

exports.verifyJsonWebToken = async (req, res, next) => {
  try {

    const token = jwt.verify()


  } catch (error) {
    next(error);
  }
};
