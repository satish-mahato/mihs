const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, "Email must be at least 6 characters long"],
    maxLength: [50, "Email must not be longer than 50 characters"],
  },
  password: {
    type: String,
    select: false,
  },
});

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

const User = mongoose.model("user", userSchema);

module.exports = User;
