const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Department = require("../models/Department");
const Category = require("../models/Category");

// CATEGORY ###############################################################

// READ
router.get("/category", async (req, res) => {
  let allCat = await Category.find();
  res.json(allCat);
});

// CREATE
router.post("/category/create", async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  try {
    const newCategory = new Category({
      title: title,
      description: description
    });

    await newCategory.save();
    res.send("Category Created");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

// UPDATE
router.post("/category/update", async (req, res) => {
  let id = req.query.id;
  let title = req.body.title;
  let description = req.body.description;
  let catToUpdate = await Category.findById(id);
  if (title) {
    catToUpdate.title = title;
  }
  if (description) {
    catToUpdate.description = description;
  }
  await catToUpdate.save();
  res.json(catToUpdate);
});

// DELETE
router.post("/category/delete", async (req, res) => {
  let id = req.query.id;
  let catToDelete = await Category.findById(id);
  await catToDelete.remove();
  res.json({ message: "Category removed" });
});

module.exports = router;
