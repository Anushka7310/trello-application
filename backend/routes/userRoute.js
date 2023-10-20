const express = require("express");
const {
  registerUser,
  loginUser,
  logout,

  updatePassword,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

module.exports = router;
