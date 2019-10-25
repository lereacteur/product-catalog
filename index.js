const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/catalog_v1", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require("./models/Product");
require("./models/Department");
require("./models/Category");

const departmentRoutes = require("./routes/department");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

// Activer les routes
app.use(departmentRoutes);
app.use(categoryRoutes);
app.use(productRoutes);

app.listen(3000, () => {
  console.log("Server started");
});
