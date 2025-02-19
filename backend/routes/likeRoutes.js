const express = require("express");
const router = express.Router();
const Like = require("../models/Like");

router.get("/", async (req, res) => {
  const likes = await Like.find().populate("userId theoryId");
  res.json(likes);
});

router.post("/", async (req, res) => {
  const newLike = new Like(req.body);
  await newLike.save();
  res.json(newLike);
});

router.delete("/:id", async (req, res) => {
  await Like.findByIdAndDelete(req.params.id);
  res.json({ message: "Like removed" });
});

module.exports = router;
