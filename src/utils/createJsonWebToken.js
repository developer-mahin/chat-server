const jwt = require("jsonwebtoken");

exports.jsonWebToken = async (payload, secret, expireIn) => {
  try {
    if (typeof payload !== "object" || !payload) {
      throw new Error("Payload must be an none empty object");
    }

    if (typeof secret !== "string" || secret === "") {
      throw new Error("Secret key must be an empty string");
    }

    const token = jwt.sign(payload, secret, { expiresIn: expireIn });
    return token;
  } catch (error) {
    throw new Error("failed to sing up with jwt", error);
  }
};
