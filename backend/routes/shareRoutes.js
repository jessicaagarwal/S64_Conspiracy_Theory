const express = require("express");
const router = express.Router();
const Share = require("../models/Share");

router.get("/", async (req, res) => {
  const shares = await Share.find().populate("userId theoryId");
  res.json(shares);
});

router.post("/", async (req, res) => {
  const newShare = new Share(req.body);
  await newShare.save();
  res.json(newShare);
});

router.delete("/:id", async (req, res) => {
  await Share.findByIdAndDelete(req.params.id);
  res.json({ message: "Share removed" });
});

module.exports = router;
