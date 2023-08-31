const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      trim: true,
      unique: true,
      validator: [validator.isEmail, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required , Please provide password"],
      validator: (value) =>
        validator.isStrongPassword(value, {
          minlength: 6,
          minLowerCase: 2,
          minUpperCase: 1,
          minSymbol: 1,
        }),
    },
    image: String,
    status: {
      type: String,
      enum: ["active", "block", "deactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
