const express = require("express");
const MemberController = require("../../controllers/Member/MemberController");
const authenticateToken = require("../../middlewares/AuthMiddleware");
const {
  validateMember,
  validateMemberId,
} = require("../../validators/Member/MemberValidation");

// Member Route

const router = express.Router();

router.get("/", authenticateToken, (req, res) =>
  MemberController.index(req, res),
);

router.post("/", authenticateToken, validateMember(false), (req, res) =>
  MemberController.store(req, res),
);

router.get("/:id", authenticateToken, validateMemberId, (req, res) =>
  MemberController.show(req, res),
);

router.put("/:id", authenticateToken, validateMember(true), (req, res) =>
  MemberController.update(req, res),
);

router.delete("/:id", authenticateToken, validateMemberId, (req, res) =>
  MemberController.destroy(req, res),
);

module.exports = router;
