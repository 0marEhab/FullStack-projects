const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Category", userSchema);
