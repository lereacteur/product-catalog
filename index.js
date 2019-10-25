const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/catalog_v3", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require("./models/Product");
require("./models/Department");
require("./models/Category");
require("./models/User");
require("./models/Review");

const departmentRoutes = require("./routes/department");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const reviewRoutes = require("./routes/review");

// Activer les routes
app.use(departmentRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(userRoutes);
app.use(reviewRoutes);

app.listen(3000, () => {
  console.log("Server started");
});
