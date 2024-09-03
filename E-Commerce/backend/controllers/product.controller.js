const Product = require("../models/Product.js");
const Category = require("../models/Category.js");
const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
const HomeBanner = require("../models/HomeBanner");
const mongoose = require("mongoose");
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
    console.log(products);
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
    const category = await Category.find();

    res.status(200).json({ category });
  } catch (err) {
    console.error("Error fetching users:", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getNewArrival = async (req, res, next) => {
  try {
    const newArrivals = await Product.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("category");
    res.status(200).json(newArrivals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching new arrivals" });
  }
};

exports.getAllBanners = async (req, res, next) => {
  const allBanners = await HomeBanner.find().populate({
    path: "product",
    select: "name image",
  });
  try {
    res.status(200).json({ allBanners });
  } catch (error) {
    res.status(500).json({ message: "Error fetching banners" });
  }
};

exports.postBanner = async (req, res, next) => {
  const id = req.body.product;
  const location = req.body.location;

  // Ensure 'id' is present and valid
  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  const banner = await HomeBanner.find();
  if (banner.length === 5) {
    return res.status(400).json({ message: "Cannot add more than 5 banners" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newBanner = await HomeBanner.create({
      location: location,
      product: id,
    });
    res.status(201).json({ message: "Banner added successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editBanner = async (req, res, next) => {
  const { id, productId } = req.body;
  try {
    await HomeBanner.findByIdAndUpdate(id, {
      product: productId,
    });
    return res.status(200).json({ message: "Banner updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating banner" });
  }
};
