const jwt = require("jsonwebtoken");

module.exports.authFilteringMiddleware = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (token) {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      if (decoded) {
        req.myId = decoded.id;
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    next();
  } catch (error) {
    throw new Error(error.message);
  }
};
