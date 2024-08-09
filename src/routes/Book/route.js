const express = require("express");
const BookController = require("../../controllers/Book/BookController");
const authenticateToken = require("../../middlewares/AuthMiddleware");
const {
  validateBook,
  validateBookId,
} = require("../../validators/Book/BookValidation");

// Book Route

const router = express.Router();

router.get("/", authenticateToken, (req, res) =>
  BookController.index(req, res),
);

router.post("/", authenticateToken, validateBook(false), (req, res) =>
  BookController.store(req, res),
);

router.get("/:id", authenticateToken, validateBookId, (req, res) =>
  BookController.show(req, res),
);

router.put("/:id", authenticateToken, validateBook(true), (req, res) =>
  BookController.update(req, res),
);

router.delete("/:id", authenticateToken, validateBookId, (req, res) =>
  BookController.destroy(req, res),
);

module.exports = router;
