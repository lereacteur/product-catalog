const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Department = require("../models/Department");
const Category = require("../models/Category");

// DEPARTMENT ###############################################################

// READ
router.get("/department", async (req, res) => {
  let allDept = await Department.find();
  res.json(allDept);
});

// CREATE
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

// UPDATE
router.post("/department/update", async (req, res) => {
  let id = req.query.id;
  let title = req.body.title;
  let deptToUpdate = await Department.findById(id);
  deptToUpdate.title = title;
  await deptToUpdate.save();
  res.json(deptToUpdate);
});

// DELETE
router.post("/department/delete", async (req, res) => {
  let id = req.query.id;
  let deptToDelete = await Department.findById(id);
  await deptToDelete.remove();
  res.json({ message: "Department removed" });
});

module.exports = router;
