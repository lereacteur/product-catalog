const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Department = require("../models/Department");
const Category = require("../models/Category");
const User = require("../models/User");
const Review = require("../models/Review");

const calculateRating = product => {
  // Si il n'y a pas d'avis, la note est égale à 0
  if (product.reviews.length === 0) {
    return 0;
  }

  let rating = 0;

  for (let i = 0; i < product.reviews.length; i++) {
    rating = rating + product.reviews[i].rating;
  }

  rating = rating / product.reviews.length;

  rating = Number(rating.toFixed(1));

  return rating;
};

// CREATE ########################################

router.post("/review/create", async (req, res) => {
  try {
    let productId = req.body.product;
    let newRating = req.body.rating;
    let newComment = req.body.comment;
    let newUser = req.body.user;
    const product = await Product.findById(productId).populate("reviews");

    if (product) {
      // Garantir l'existance du tableau reviews
      if (product.reviews === undefined) {
        product.reviews = [];
      }

      const review = new Review({
        rating: newRating,
        comment: newComment,
        user: newUser
      });

      await review.save();

      // Ajoute l'avis dans le produit
      product.reviews.push(review);

      // Mettre à jour la note moyenne
      const rating = calculateRating(product);
      product.averageRating = rating;

      // Sauvegarder les modifications du produit
      await product.save();

      res.json(review);
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

// UPDATE ########################################

router.post("/review/update", async (req, res) => {
  try {
    // Modifier l'avis ayant l'id req.query.id
    const review = await Review.findById(req.query.id);

    if (review) {
      review.comment = req.body.comment;
      review.rating = req.body.rating;
      await review.save();

      // Chercher un produit associé à un ou plusieurs avis
      const product = await Product.findOne({
        reviews: { $in: [req.query.id] }
      }).populate("reviews");

      // Mettre à jour la note moyenne
      const rating = calculateRating(product);
      product.averageRating = rating;

      await product.save();
      res.json(review);
    } else {
      res.status(400).json({ message: "Review not found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

// DELETE ########################################

router.post("/review/delete", async (req, res) => {
  try {
    let id = req.query.id; // l'id de la review à supprimer
    let newReviewsTab = []; // création du nouveau tableau de reviews

    const reviewToDelete = await Review.findById(id); // recherche de la review à supprimer
    if (reviewToDelete) {
      // si elle existe
      await reviewToDelete.remove(); // on la supprime
      const product = await Product.findOne({ reviews: id }); // on cherche le produit associé à cette review

      for (let i = 0; i < product.reviews.length; i++) {
        // boucle sur le tableau de reviews
        if (product.reviews[i].toString() !== id) {
          // si l'id de la review qui est dans la tableau est différent de l'id de la review à supprimer
          // attention, ici, product.reviews[i] est un ObjectId, il faut le transformer en String pour pourvoir le comparer à l'id rentré en query
          newReviewsTab.push(product.reviews[i]); // alors on push cette id dans le nouveau tableau de reviews
        }
      }
      product.reviews = newReviewsTab; // on assigne le nouveau tableau comme valeur de product.reviews
      await product.save(); // on sauvergarde le produit pour prendre en compte son nouveau tableau de reviews

      res.json({ message: "Review deleted" });
    } else {
      res.json({ message: "Review not found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
