const express = require("express");
const isAuth = require("../middleware/isAuth");
const authorization = require("../middleware/authorization");
const userController = require("../controllers/user.controller");
const validator = require("../middleware/user.validation");
const router = express.Router();
const multer = require("../middleware/multer");

router.get("/profile", isAuth, userController.Profile);
router.get(
  "/getAllUsers",
  isAuth,
  authorization("admin"),
  userController.getAllUsers
);
router.post("/login", userController.Login);
router.post(
  "/signup",
  multer("profilePic"),
  validator.signup,
  userController.Signup
);
router.put(
  "/editEmail",
  isAuth,
  multer("profilePic"),
  validator.signup,
  userController.edit
);
router.delete("/delete", isAuth, userController.Delete);
router.delete("/delete/:id", isAuth, userController.deleteById);
router.post("/cart", isAuth, userController.addToCart);
router.get("/cart", isAuth, userController.getCart);
router.patch("/decrementCart/:id", isAuth, userController.decrementCartQuantity);
router.delete("/deleteFromCart/:id", isAuth, userController.deleteFromCart);

module.exports = router;
