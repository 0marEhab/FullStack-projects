const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/isAuth");
const validator = require("../middleware/product.validation");
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
  isAuth,
  authorization("admin"),
  product.getAllCategory
);
router.post("/add-category", isAuth, product.addCategory);
router.post(
  "/add-product",
  cloudMulter("image"),
  validator.addProduct,
  isAuth,
  product.Store
);
router.get("/getBanner", product.getAllBanners);
router.post("/storeBanner", product.postBanner);

module.exports = router;
