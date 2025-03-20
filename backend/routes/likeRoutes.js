const express = require("express");
const router = express.Router();
const Like = require("../models/Like");
const { protectAdmin } = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    // Check if userId query parameter is provided
    const { userId } = req.query;
    
    // If userId is provided, filter likes by that user
    const filter = userId ? { userId } : {};
    
    const likes = await Like.find(filter).populate("userId theoryId");
    res.json(likes);
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ message: "Error fetching likes", error: error.message });
  }
});
// Get likes by specific user ID (admin only)
router.get("/by-user/:userId", protectAdmin, async (req, res) => {
  try {
    const likes = await Like.find({ userId: req.params.userId }).populate("userId theoryId");
    res.json(likes);
  } catch (error) {
    console.error("Error fetching user likes:", error);
    res.status(500).json({ message: "Error fetching user likes", error: error.message });
  }
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
