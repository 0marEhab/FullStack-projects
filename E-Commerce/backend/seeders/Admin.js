const User = require("../models/User");
require("dotenv").config(); 

const AdminSeeder = async () => {
  let admin = await User.findOne({ email: process.env.SEEDER_EMAIL }); 
  if (!admin) {
    admin = await User.create({
      name: process.env.SEEDER_NAME,
      email: process.env.SEEDER_EMAIL,
      password: process.env.SEEDER_PASSWORD,
      mobile: process.env.SEEDER_MOBILE,
      role: "admin",
    });
  }
 
};

module.exports = AdminSeeder;
