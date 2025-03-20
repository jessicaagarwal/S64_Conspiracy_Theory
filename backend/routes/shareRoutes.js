const express = require("express");
const router = express.Router();
const Share = require("../models/Share");
const { protectAdmin } = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    // Check if userId query parameter is provided
    const { userId } = req.query;
    
    // If userId is provided, filter shares by that user
    const filter = userId ? { userId } : {};
    
    const shares = await Share.find(filter).populate("userId theoryId");
    res.json(shares);
  } catch (error) {
    console.error("Error fetching shares:", error);
    res.status(500).json({ message: "Error fetching shares", error: error.message });
  }
});
// Get shares by specific user ID (admin only)
router.get("/by-user/:userId", protectAdmin, async (req, res) => {
  try {
    const shares = await Share.find({ userId: req.params.userId }).populate("userId theoryId");
    res.json(shares);
  } catch (error) {
    console.error("Error fetching user shares:", error);
    res.status(500).json({ message: "Error fetching user shares", error: error.message });
  }
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
