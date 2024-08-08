const express = require("express");
const AuthController = require("../../controllers/Auth/AuthController");
const { validateUserLogin } = require("../../validators/Auth/AuthValidation");
const authenticateToken = require("../../middlewares/AuthMiddleware");

// Auth Route

const router = express.Router();

router.post("/login", validateUserLogin, (req, res) =>
  AuthController.login(req, res),
);
router.post("/logout", authenticateToken, (req, res) =>
  AuthController.logout(req, res),
);

module.exports = router;
