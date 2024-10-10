const { body, validationResult } = require("express-validator");
const Product = require("../models/Product");

exports.addProduct = [
  body("name")
    .isString()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .custom(async (value) => {
      const product = await Product.findOne({ name: value });
      if (product) {
          throw new Error("Product already exists");
      }
    }),
  body("price")
    .isFloat({ min: 0.01 })
    .withMessage("Price must be a number greater than 0."),
  body("category")
    .isMongoId()
    .withMessage("Category must be a valid MongoDB ID."),
  body("description")
    .isString()
    .trim()
    .isLength({ min: 1 })
    .withMessage(
      "Description is required and must be at least 1 character long."
    ),
    body("image")
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      const image = req.file;
      const validTypes = ["image/jpeg", "image/png", "image/gif","image/webp"];
      if (!validTypes.includes(image.mimetype)) {
        throw new Error("Invalid image type. Only JPEG, PNG, and GIF are allowed.");
      }
      if (image.size > 5 * 1024 * 1024) { // 5MB
        throw new Error("Image size must be less than 5MB");
      }
      return true;
    }),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be an integer greater than or equal to 0."),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      next();
    },
];
