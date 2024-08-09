const { body, param, validationResult } = require("express-validator");
const BookRepository = require("../../repositories/Book/BookRepository");

// Inject repository
const bookRepository = new BookRepository();

/**
 * Validation to validate book data for creation or update.
 *
 * @param {boolean} isUpdate - Indicates if the validation is for an update operation.
 * @returns {Array} An array of validation middleware functions.
 */
const validateBook = (isUpdate = false) => {
  return [
    // If update, validate the book ID
    ...(isUpdate
      ? [
          param("id").custom(async (id) => {
            const book = await bookRepository.findById(id);
            if (!book) {
              throw new Error("Book not found");
            }
          }),
        ]
      : []),

    // Validate the 'code' field
    body("code")
      .notEmpty()
      .withMessage("Code is required")
      .bail()
      .custom(async (code, { req }) => {
        // Check if the book code is unique
        const existingBook = await bookRepository.findByCode(code);

        if (
          existingBook &&
          (!isUpdate || existingBook.id !== parseInt(req.params.id, 10))
        ) {
          throw new Error("Book code must be unique");
        }
      }),

    // Validate the 'title' field
    body("title").notEmpty().withMessage("Title is required"),

    // Validate the 'author' field
    body("author").notEmpty().withMessage("Author is required"),

    // Validate the 'stock' field
    body("stock")
      .notEmpty()
      .withMessage("Stock is required")
      .bail()
      .custom((value) => {
        // Ensure stock is a valid integer
        if (typeof value === "string" && value.trim() !== "") {
          throw new Error("Stock must be an integer");
        }
        return true;
      })
      .bail()
      .isInt({ min: 1 })
      .withMessage("Stock must be at least 1"),

    // Handle validation errors
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const extractedErrors = {};
        errors.array().forEach((err) => {
          if (!extractedErrors[err.path]) {
            extractedErrors[err.path] = err.msg;
          }
        });

        return res.status(400).json({ errors: extractedErrors });
      }
      next();
    },
  ];
};

/**
 * Validation to validate the book ID.
 *
 * @returns {Array} An array of validation middleware functions.
 */
const validateBookId = [
  param("id").custom(async (id) => {
    // Validate the book ID
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new Error("Book not found");
    }
    return true;
  }),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const extractedErrors = {};
      errors.array().forEach((err) => {
        if (!extractedErrors[err.path]) {
          extractedErrors[err.path] = err.msg;
        }
      });

      return res.status(400).json({ errors: extractedErrors });
    }
    next();
  },
];

// Export module
module.exports = {
  validateBook,
  validateBookId,
};
