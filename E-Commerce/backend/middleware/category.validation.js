const { body, validationResult } = require("express-validator");
const Category = require("../models/Category");


exports.addCategory = [
  body("name")
    .isString()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .custom(async (value) => {
      const category = await Category.findOne({ name: value });
      if (category) {
        throw new Error("Category already exists");
      }
    }),
// //   body("image").custom((value, { req }) => {
// //     if (!req.file) {
// //       throw new Error("Image is required");
// //     }
// //     const image = req.file;
// //     const validTypes = ["image/jpeg", "image/png", "image/gif"];
// //     if (!validTypes.includes(image.mimetype)) {
// //       throw new Error(
// //         "Invalid image type. Only JPEG, PNG, and GIF are allowed."
// //       );
// //     }
// //     if (image.size > 5 * 1024 * 1024) {
// //       // 5MB
// //       throw new Error("Image size must be less than 5MB");
// //     }
// //     return true;
//   }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
