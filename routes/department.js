const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Department = require("../models/Department");
const Category = require("../models/Category");

// READ ###############################################################

router.get("/department", async (req, res) => {
  let allDept = await Department.find();
  res.json(allDept);
});

// CREATE ###############################################################

router.post("/department/create", async (req, res) => {
  let title = req.body.title;
  try {
    const newDepartment = new Department({
      title: title
    });
    await newDepartment.save();
    res.send("Department Created");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

// UPDATE ###############################################################

router.post("/department/update", async (req, res) => {
  let id = req.query.id;
  let title = req.body.title;
  let deptToUpdate = await Department.findById(id);
  deptToUpdate.title = title;
  await deptToUpdate.save();
  res.json(deptToUpdate);
});

// DELETE ###############################################################

router.post("/department/delete", async (req, res) => {
  let id = req.query.id;
  let deptToDelete = await Department.findById(id);

  if (deptToDelete) {
    // suppression du department
    deptToDelete.remove();
    // supprimer aussi les categories
    const categories = await Category.find({
      department: req.query.id
    });
    for (let i = 0; i < categories.length; i++) {
      const products = await Product.find({
        category: categories[i]._id
      });
      // supprimer aussi les produits
      for (let j = 0; j < products.length; j++) {
        await products[j].remove();
      }
      await categories[i].remove();
    }

    res.json({ message: "Department removed" });
  } else {
    res.status(400).json({
      message: "Department not found"
    });
  }
});

module.exports = router;
