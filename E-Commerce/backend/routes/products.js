const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/isAuth");
const validator = require("../middleware/product.validation");
const categoryValidator = require("../middleware/category.validation");
const product = require("../controllers/product.controller");
const authorization = require("../middleware/authorization");

const cloudMulter = require("../middleware/nonDestinationMulter");
router.get(
  "/getAllProducts",
  isAuth,
  authorization("admin"),
  product.getAllProducts
);
router.get("/getNewArrival", product.getNewArrival);
router.get(
  "/getAllCategories",

  product.getAllCategory
);
router.get("/getProducts", product.getProducts);
router.get("/products/:productName", product.getProductByName);
router.post(
  "/add-category",
  isAuth,
  cloudMulter("image"),
  // categoryValidator.addCategory,
  product.addCategory
);

router.put(
  "/update-product/:id",
  cloudMulter("image"),
  validator.addProduct,
  isAuth,
  product.updateProduct
);
router.put(
  "/update-category/:id",
  cloudMulter("image"),

  isAuth,
  product.updateCategory
);

router.post(
  "/add-product",
  cloudMulter("image"),
  validator.addProduct,
  isAuth,
  product.Store
);
router.get("/getBanner", product.getAllBanners);
router.post("/storeBanner", product.postBanner);
router.put("/editBanner", product.editBanner);
router.delete("/deleteProduct/:id", isAuth, product.deleteProductById);
router.delete("/deleteCategory/:id", isAuth, product.deleteCategoryById);

module.exports = router;
