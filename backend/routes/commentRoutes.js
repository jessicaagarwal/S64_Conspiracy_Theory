const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

router.get("/", async (req, res) => {
  const comments = await Comment.find().populate("userId theoryId");
  res.json(comments);
});

router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  await newComment.save();
  res.json(newComment);
});

router.put("/:id", async (req, res) => {
  const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedComment);
});

router.delete("/:id", async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ message: "Comment deleted" });
});

module.exports = router;
