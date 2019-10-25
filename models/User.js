const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    minlength: 6,
    maxlength: 254
  }
});

module.exports = User;
