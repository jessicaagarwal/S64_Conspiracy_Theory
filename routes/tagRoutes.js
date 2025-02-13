const express = require("express");
const router = express.Router();
const Tag = require("../models/Tag");

router.get("/", async (req, res) => {
  const tags = await Tag.find();
  res.json(tags);
});

router.post("/", async (req, res) => {
  const newTag = new Tag(req.body);
  await newTag.save();
  res.json(newTag);
});

router.delete("/:id", async (req, res) => {
  await Tag.findByIdAndDelete(req.params.id);
  res.json({ message: "Tag removed" });
});

module.exports = router;
