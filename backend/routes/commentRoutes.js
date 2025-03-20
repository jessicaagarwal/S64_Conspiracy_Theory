const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const { protectAdmin } = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    // Check if userId query parameter is provided
    const { userId } = req.query;
    
    // If userId is provided, filter comments by that user
    const filter = userId ? { userId } : {};
    
    const comments = await Comment.find(filter).populate("userId theoryId");
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
});
// Get comments by specific user ID (admin only)
router.get("/by-user/:userId", protectAdmin, async (req, res) => {
  try {
    const comments = await Comment.find({ userId: req.params.userId }).populate("userId theoryId");
    res.json(comments);
  } catch (error) {
    console.error("Error fetching user comments:", error);
    res.status(500).json({ message: "Error fetching user comments", error: error.message });
  }
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
