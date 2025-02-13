const express = require("express");
const router = express.Router();
const Theory = require("../models/Theory");

router.get("/", async (req, res) => {
  const theories = await Theory.find().populate("tags createdBy");
  res.json(theories);
});

router.post("/", async (req, res) => {
  const newTheory = new Theory(req.body);
  await newTheory.save();
  res.json(newTheory);
});

router.put("/:id", async (req, res) => {
  const updatedTheory = await Theory.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTheory);
});

router.delete("/:id", async (req, res) => {
  await Theory.findByIdAndDelete(req.params.id);
  res.json({ message: "Theory deleted" });
});

module.exports = router;
