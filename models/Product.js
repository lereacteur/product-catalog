const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  price: {
    type: Number
  }
});

module.exports = Product;
