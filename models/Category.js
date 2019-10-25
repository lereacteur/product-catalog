const mongoose = require("mongoose");

const Category = mongoose.model("Category", {
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  }
});

module.exports = Category;
