const User = require("../models/User");

module.exports = (role) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== role) {
      return res.status(401).json({ message: "Forbidden" });
    } else {
      next();
    }
  };
};
