const Product = require("../models/Product.js");
const Category = require("../models/Category.js");
const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;

exports.Store = async (req, res, next) => {
  let filePath;
  const { name, price, category, description, stock } = req.body;

  try {
    if (req.file) {
      console.log("File received:", req.file);
      filePath = req.file.path;
    } else {
      console.log("No file received");
    }

    const newError = new Error();

    if (!validationResult(req).isEmpty()) {
      const errors = validationResult(req).array();
      newError.statusCode = 422;
      newError.message = errors;
      return next(newError);
    }
    const cloudImg = await cloudinary.uploader.upload(filePath, {
      folder: "products", 
    });
    const product = await Product.create({
      name: name,
      price: price,
      category: category,
      description: description,
      image: cloudImg.url,
      stock: stock,
    });
    

    res.status(201).json({
      message: "Product created successfully",
      product: product,
    });
  } catch (err) {
    return next(err);
  }
};

exports.addCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name: name });
    res.status(201).json({
      message: "Category created successfully",
      category: category,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category");
    console.log(products)
    res.status(200).json({ products });
  } catch (err) {
    console.error("Error fetching users:", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.find()
    
    res.status(200).json({ category });
  } catch (err) {
    console.error("Error fetching users:", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
