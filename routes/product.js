const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Department = require("../models/Department");
const Category = require("../models/Category");

// PRODUCT ###############################################################

// READ
router.get("/product", async (req, res) => {
  let allProd = await Product.find();
  res.json(allProd);
});

// CREATE
router.post("/product/create", async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  try {
    const newProduct = new Product({
      title: title,
      description: description,
      price: price
    });

    await newProduct.save();
    res.send("Product Created");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

// UPDATE
router.post("/product/update", async (req, res) => {
  let id = req.query.id;
  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let prodToUpdate = await Product.findById(id);
  if (title) {
    prodToUpdate.title = title;
  }
  if (description) {
    prodToUpdate.description = description;
  }
  if (price) {
    prodToUpdate.price = price;
  }
  await prodToUpdate.save();
  res.json(prodToUpdate);
});

// DELETE
router.post("/product/delete", async (req, res) => {
  let id = req.query.id;
  let prodToDelete = await Product.findById(id);
  await prodToDelete.remove();
  res.json({ message: "Product removed" });
});

module.exports = router;
