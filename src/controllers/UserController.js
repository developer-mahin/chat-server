const { jsonWebToken } = require("../utils/createJsonWebToken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const { verifyEmailAddress } = require("../utils/emailVerification");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password, image } = req.body;

    const isExist = await User.exists({ email });
    if (isExist) {
      throw new Error(
        "User Already exist with this email address, Please try again or create an account"
      );
    }

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const userData = {
      name,
      email,
      password: hashedPassword,
      status: "active",
    };
    const token = await jsonWebToken(userData, process.env.ACCESS_TOKEN, "10m");

    try {
      const mailData = {
        email: email,
        subject: "Account Activation Email",
        html: `
        <div style="display: flex;align-items: center; justify-content: center;">
        <div>
            <div style="display: flex;align-items: center; justify-content: center; ">
                <img width="80px" src="https://i.ibb.co/vPj5LL0/logo.png" alt="">
            </div>
            <h2 style="font-size: 30px;">Welcome to chat app</h2>
            <h2 style="font-size: 30px;">Hello ${name} !</h2>
            <p>Please activate your account to click here </p>
            <div style="margin-top: 10px;">
                <a style="padding:10px 20px; color:green; background:cyan; border-radius:5px;text-decoration:none"
                    href="${process.env.SERVER_URL}api/v1/auth/verify/${token}" target="_blank">
                    Click here to activate
                </a>
            </div>
        </div>
    </div>
            `,
      };

      await verifyEmailAddress(mailData);

      res.status(201).json({
        success: true,
        message:
          "Successfully user created, Please verify email address and login",
        token,
      });
    } catch (error) {
      next(createError(404, "Failed to verify email"));
    }
  } catch (error) {
    next(error);
  }
};

exports.verifyUser = async (req, res, next) => {
  try {
    const { token } = req.params;
    if (!token) {
      throw new Error("Token not found");
    }
    console.log(token);
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

      const isExist = await User.exists({ email: decoded.email });
      if (isExist) {
        throw new Error("User already exist please login");
      }

      await User.create(decoded);

      res.send(
        `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        
        <body
            style="background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://i.ibb.co/vPj5LL0/logo.png); 
                        background-position: center; background-repeat: no-repeat; background-size: contain;  display: flex; align-items:  center; justify-content: center; height: 98vh; color: white;">
            <div>
                <h1 style="text-align:center ; font-size: 70px; margin: 0;">Hello ${decoded.name}</h1>
                <p style="text-align:center ;font-size: 50px; margin: 0;">You are now a verified user</p>
                <p style="text-align:center ;font-size: 40px; margin: 0;">Please login your with your account</p>
                <div style="display: flex; align-items: center; justify-content: center; margin-top: 20px;">
                    <a href="${process.env.CLIENT_URL}auth"
                        style="padding: 12px 20px; background-color: aqua; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 30px;">Login</a>
                </div>
            </div>
        </body>
        
        </html>
            `
      );
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createError(401, "Token expired");
      }
      if (error.name === "JsonWebTokenError") {
        throw createError(401, "Invalid token");
      } else {
        throw error;
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw createError(
        404,
        "User not found with this email, Please create an account"
      );
    }

    const matchPassword = bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw createError(
        404,
        "User credential not matched please provide valid info"
      );
    }

    if (user.status === "block" || user.status === "deactive") {
      throw createError(
        404,
        "You are not authorized user, Please contact with authority"
      );
    }

    const userData = {
      id: user._id,
      email,
      password: user.password,
      status: "active",
    };

    const token = await jsonWebToken(
      userData,
      process.env.ACCESS_TOKEN,
      "365days"
    );

    res.cookie("access_token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      message: "user login successfully",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
