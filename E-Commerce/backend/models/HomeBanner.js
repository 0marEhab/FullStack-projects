const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var HomeBannerSchema = new mongoose.Schema({
  location: String,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

//Export the model
module.exports = mongoose.model("HomeBanner", HomeBannerSchema);
