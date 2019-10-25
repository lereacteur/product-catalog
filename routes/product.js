const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Department = require("../models/Department");
const Category = require("../models/Category");

// READ ########################################

const createFilters = req => {
  const filters = {};

  if (req.query.priceMin) {
    filters.price = {};
    filters.price.$gte = req.query.priceMin;
  }
  if (req.query.priceMax) {
    if (filters.price === undefined) {
      filters.price = {};
    }
    filters.price.$lte = req.query.priceMax;
  }
  if (req.query.category) {
    filters.category = req.query.category;
  }
  if (req.query.title) {
    filters.title = new RegExp(req.query.title, "i");
  }
  return filters;
};

router.get("/product", async (req, res) => {
  const filters = createFilters(req);

  // Ici, nous construisons notre recherche
  const search = Product.find(filters).populate("category");

  if (req.query.sort === "rating-asc") {
    search.sort({ averageRating: 1 });
  } else if (req.query.sort === "rating-desc") {
    search.sort({ averageRating: -1 });
  } else if (req.query.sort === "price-asc") {
    // Ici, nous continuons de construire notre recherche
    search.sort({ price: 1 });
  } else if (req.query.sort === "price-desc") {
    // Ici, nous continuons de construire notre recherche
    search.sort({ price: -1 });
  }

  // limit : le nombre de résultats affichés
  // skip : Ignorer les X premiers

  if (req.query.page) {
    const page = req.query.page;
    const limit = 4;

    search.limit(limit).skip(limit * (page - 1));
  }

  const products = await search;
  res.json(products);
});

// CREATE ########################################

router.post("/product/create", async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let categoryId = req.body.category;
  try {
    const newProduct = new Product({
      title: title,
      description: description,
      price: price,
      category: categoryId
    });

    await newProduct.save();
    res.send("Product Created");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

// UPDATE ########################################

router.post("/product/update", async (req, res) => {
  let id = req.query.id;
  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let categoryId = req.body.category;
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
  if (categoryId) {
    prodToUpdate.category = categoryId;
  }
  await prodToUpdate.save();
  res.json(prodToUpdate);
});

// DELETE ########################################

router.post("/product/delete", async (req, res) => {
  let id = req.query.id;
  let prodToDelete = await Category.findById(id);

  if (prodToDelete) {
    // suppression de la categorie
    prodToDelete.remove();

    res.json({ message: "Product removed" });
  } else {
    res.status(400).json({
      message: "Product not found"
    });
  }
});

module.exports = router;
