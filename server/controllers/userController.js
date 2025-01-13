const userModel = require("../models/user.model.js");
const userService = require("../services/user.service.js");
const { validationResult } = require("express-validator");
const redisClient = require("../services/redis.service.js");

const createUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    const user = await userService.createUser({ name, email, password });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const loginController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        errors: "Email is not registered",
      });
    }

    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        errors: "Incorrect password",
      });
    }

    const token = await user.generateJWT();

    delete user._doc.password;

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.log(err);

    res.status(400).send(err.message);
  }
};

const profileController = async (req, res) => {
  res.status(200).json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
};

const logoutController = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    redisClient.set(token, "logout", "EX", 60 * 60 * 24);

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

const getAllUsersController = async (req, res) => {
  try {
    // Fetch the logged-in user's details
    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });

    // Fetch all users excluding the logged-in user
    const allUsers = await userService.getAllUsers({
      userId: loggedInUser._id,
    });

    // Return users with necessary details including name
    return res.status(200).json({
      users: allUsers.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
      })),
    });
  } catch (err) {
    console.error("Error in getAllUsersController:", err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createUserController,
  loginController,
  profileController,
  logoutController,
  getAllUsersController,
};
