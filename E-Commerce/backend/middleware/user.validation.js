const { body, validationResult } = require("express-validator");
const User = require("../models/User");

exports.signup = [
  body("email")
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Please enter an email")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 255 })
    .withMessage("Email is too long")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("Email already exists");
      }
    }),
  body("name")
  .not()
  .isEmpty()
  .withMessage("Confirm name is required")
  .custom(async (value, { req }) => {
    const user =  await User.find({name: value})
    if (user) {
       return false
    }
    return true;
  })
  .withMessage("name is already exists"),

  body("password")
    .not()
    .isEmpty()
    .withMessage("Please enter a password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter"),
  // Custom middleware to handle validation results

  body("confirmPassword")
  .not()
  .isEmpty()
  .withMessage("Confirm password is required")
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

];

exports.login = [
  body("email")
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Please enter your email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .isLength({ max: 255 })
    .withMessage("Email is too long"),
  body("password").not().isEmpty().withMessage("Please enter your password"),

  // Custom middleware to handle validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
