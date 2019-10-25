const mongoose = require("mongoose");

const Category = mongoose.model("Category", {
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  }
});

module.exports = Category;
