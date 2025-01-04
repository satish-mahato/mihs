const { Router } = require("express");
const userController = require("../controllers/userController.js");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  userController.createUserController
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  userController.loginController
);

router.get(
  "/profile",
  authMiddleware.authUser,
  userController.profileController
);

router.get("/logout", authMiddleware.authUser, userController.logoutController);

router.get(
  "/all",
  authMiddleware.authUser,
  userController.getAllUsersController
);

module.exports = router;
