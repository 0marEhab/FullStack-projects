var express = require("express");
const compression = require("compression");
var path = require("path");
var logger = require("morgan");
var db = require("./config/db");
var cloudinary = require("./config/cloudnairy");
var error = require("./middleware/error_handle");
const cors = require("cors");

var userRouter = require("./routes/users");
var productRouter = require("./routes/products");

var app = express();
app.use(compression());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api", userRouter);
app.use("/api", productRouter);

app.use(error.notfound);

app.use(error.errorhandler);
require("./seeders/index");
db();
cloudinary();
module.exports = app;
