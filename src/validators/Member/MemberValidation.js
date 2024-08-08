const { body, param, validationResult } = require("express-validator");
const MemberRepository = require("../../repositories/Member/MemberRepository");

// Inject repository
const memberRepository = new MemberRepository();

/**
 * Validation to validate member data for creation or update.
 *
 * @param {boolean} isUpdate - Indicates if the validation is for an update operation.
 * @returns {Array} Validation middleware array.
 */
const validateMember = (isUpdate = false) => {
  return [
    // If update, validate the member ID
    ...(isUpdate
      ? [
          param("id").custom(async (id) => {
            const member = await memberRepository.findById(id);
            if (!member) {
              throw new Error("Member not found");
            }
          }),
        ]
      : []),

    // Validate the 'name' field
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .custom(async (name, { req }) => {
        let memberId = null;

        // If update, get the member ID from the request parameters
        if (isUpdate) {
          memberId = req.params.id;
        }

        // Check if the name is unique
        const existingMember = await memberRepository.findByName(name);
        if (existingMember && existingMember.id !== parseInt(memberId, 10)) {
          throw new Error("Name must be unique");
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
};

/**
 * Validation to validate the member ID.
 *
 * @returns {Array} Validation middleware array.
 */
const validateMemberId = [
  // Validate the member ID
  param("id").custom(async (id) => {
    const member = await memberRepository.findById(id);
    if (!member) {
      throw new Error("Member not found");
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

module.exports = {
  validateMember,
  validateMemberId,
};
