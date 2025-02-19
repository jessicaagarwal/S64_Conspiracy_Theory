const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

router.get("/", async (req, res) => {
  const admins = await Admin.find();
  res.json(admins);
});

router.post("/", async (req, res) => {
  const newAdmin = new Admin(req.body);
  await newAdmin.save();
  res.json(newAdmin);
});

module.exports = router;
