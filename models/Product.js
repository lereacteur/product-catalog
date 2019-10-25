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
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
});

module.exports = Product;
