const userModel = require("../models/user.model.js");

const createUser = async ({ email, password, name }) => {
  if (!email || !password || !name) {
    throw new Error("Name, email, and password are required");
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

const getAllUsers = async ({ userId }) => {
  const users = await userModel.find(
    { _id: { $ne: userId } },
    { _id: 1, name: 1, email: 1 } // Only selecting necessary fields
  );
  return users;
};

module.exports = {
  createUser,
  getAllUsers,
};
