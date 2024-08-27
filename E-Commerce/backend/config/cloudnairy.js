require("dotenv").config();
const cloudinary = require("cloudinary").v2;

module.exports = async () => {
  cloudinary.config({
    cloud_name: "dtl52zfqq",
    api_key: process.env.Cloudinary_API_KEY,
    api_secret: process.env.Cloudinary_Secret_KEY,
  });

  console.log("cloudinary connected");
};
