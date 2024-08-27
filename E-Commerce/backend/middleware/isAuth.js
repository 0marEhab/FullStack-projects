const jwt = require("jsonwebtoken");
const User = require("../models/User"); 

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Not authenticated");
    res.status(401).json({ message: error.message });
    return;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err.message);
    err.statusCode = 401;
    return next(err);
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated");
    res.status(401).json({ message: error.message });
    return;
  }

  try {
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      const error = new Error("User not found");
      res.status(401).json({ message: error.message });
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    err.statusCode = 500;
    return next(err);
  }
};
