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
  let filePath;

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
      folder: "categories",
    });

    const category = await Category.create({ name: name, image: cloudImg.url });
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
    res.status(200).json({ products });
  } catch (err) {
    console.error("Error fetching users:", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    // Filter
    const excluded = ["sort", "page", "limit", "fields", "category"];
    const queryObj = { ...req.query };
    excluded.forEach((element) => delete queryObj[element]);
    const querySTR = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (val) => `$${val}`
    );

    let query = Product.find(JSON.parse(querySTR)).populate({
      path: "category",
      select: "name",
      match: { name: { $ne: null } }, // Exclude products with null category
    });

    // Filter by category
    if (req.query.category) {
      query = query.populate({
        path: "category",
        match: { name: req.query.category },
        select: "name",
      });
    }

    // Count total products (before applying pagination)
    const totalProducts = await Product.countDocuments({
      ...JSON.parse(querySTR),
      category: { $ne: null }, // Exclude products with null category
    });

    // Pagination parameters
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const totalPages = Math.ceil(totalProducts / limit);

    // Pagination
    if (req.query.limit && req.query.page) {
      const skip = (page - 1) * limit;
      query.skip(skip).limit(limit);
    }

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query.sort(sortBy);
    } else {
      query.sort("-createdAt");
    }

    // Limit fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query.select(fields);
    } else {
      query.select("-__v");
    }

    const products = await query;

    // Filter out products with null categories from the final result
    const filteredProducts = products.filter(
      (product) => product.category !== null
    );

    res.status(200).json({
      msg: "Successful fetch",
      data: filteredProducts,
      totalProducts: totalProducts, // Include the total number of products
      totalPages: totalPages, // Include the total number of pages
      currentPage: page, // Include the current page number
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductByName = async (req, res) => {
  try {
    const { productName } = req.params;

    // Fetch the product by name from the database
    const product = await Product.findOne({ name: productName }).populate(
      "category"
    );

    // If product not found
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Return product details
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    let productId = req.params.id.trim();

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Product", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { name, description, price, stock, category } = req.body;

    // Handle file upload
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    // Update product data
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        stock,
        category,
        ...(imageUrl && { image: imageUrl }), // Only update the image if a new one is provided
      },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
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

exports.deleteCategoryById = async (req, res) => {
  try {
    let categoryId = req.params.id.trim();

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const deletedcategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedcategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Category", error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { name } = req.body;

    // Handle file upload
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,

        ...(imageUrl && { image: imageUrl }), // Only update the image if a new one is provided
      },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
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
