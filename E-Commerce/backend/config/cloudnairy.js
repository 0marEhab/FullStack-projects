require("dotenv").config();
const cloudinary = require("cloudinary").v2;

module.exports = async () => {
  cloudinary.config({
    cloud_name: "dtl52zfqq",
    api_key: "574143294315224",
    api_secret: "8--8KqcdP0-VfoUrt535ipt4Zv8",
  });

  console.log("cloudinary connected");
};
