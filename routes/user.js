const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Department = require("../models/Department");
const Category = require("../models/Category");
const User = require("../models/User");
const Review = require("../models/Review");

// READ ########################################

router.get("/user", async (req, res) => {
  try {
    let id = req.query.id;
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

// CREATE ########################################

router.post("/user/create", async (req, res) => {
  try {
    let username = req.body.username;
    let email = req.body.email;

    const newUser = new User({
      username: username,
      email: email
    });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// UPDATE ########################################

router.post("/user/update", async (req, res) => {
  try {
    let id = req.query.id;
    let username = req.body.username;
    let email = req.body.email;

    const userToUpdate = await User.findById(id);
    if (userToUpdate) {
      if (username) {
        userToUpdate.username = username;
      }
      if (email) {
        userToUpdate.email = email;
      }
      await userToUpdate.save();
      res.json(userToUpdate);
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

// DELETE ########################################

router.post("/user/delete", async (req, res) => {
  try {
    let id = req.query.id;
    const userToDelete = await User.findById(id);
    if (userToDelete) {
      userToDelete.remove();
      res.json({ message: "User deleted" });
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
