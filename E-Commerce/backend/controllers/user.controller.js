const User = require("../models/User");
const generateToken = require("../config/generateToken");
const { validationResult } = require("express-validator");

exports.Login = async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
    if (!user || !(await user.isPasswordMatched(password))) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }
    const token = generateToken.Login(user._id.toString());
    res.statusCode = 200;
    res.json({
      token: token,
      message: "Login successful",
      email: user.email,
    });
  } catch (err) {
    return next(err);
  }
};
exports.Signup = async (req, res, next) => {
  const { name, email, mobile, password, confirmPassword } = req.body;

  const newError = new Error();

  if (!validationResult(req).isEmpty()) {
    const errors = validationResult(req).array();
    newError.statusCode = 422;
    newError.message = errors;
    return next(newError);
  }
  let filePath;
  try {
    if (req.file) {
      filePath = req.file.path;
      console.log(filePath);
    }

    const user = await User.create({
      name,
      email,
      mobile,
      password,
      profilePic: filePath,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    const error = new Error("Could not create user");
    error.statusCode = 500;
    return next(error);
  }
};

exports.edit = async (req, res, next) => {
  const { name, email, mobile, password } = req.body;
  console.log(req.body);
  let filePath;
  try {
    if (req.file) {
      filePath = req.file.path;
      console.log(filePath);
    }

    // Build update object
    const updateFields = { name, email, mobile };

    updateFields.profilePic = filePath;

    if (password) {
      updateFields.password = password; // Ensure password hashing is handled elsewhere
    }

    console.log("Update fields:", updateFields);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateFields,
      { new: true } // This option returns the updated document
    );

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Account updated successfully",
      user: user,
    });
  } catch (err) {
    console.error("Error updating user:", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.Profile = async (req, res, next) => {
  let user;
  try {
    user = req.user; // Use req.user instead of req.userId
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ user });
  } catch (err) {
    const error = new Error("Could not fetch user profile");
    error.statusCode = 500;
    return next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.Delete = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.deleteById = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
