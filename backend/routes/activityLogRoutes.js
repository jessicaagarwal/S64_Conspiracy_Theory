const express = require("express");
const router = express.Router();
const ActivityLog = require("../models/ActivityLog");
const { protectAdmin } = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    // Check if userId query parameter is provided
    const { userId } = req.query;
    
    // If userId is provided, filter activity logs by that user
    const filter = userId ? { userId } : {};
    
    const logs = await ActivityLog.find(filter).populate("userId");
    res.json(logs);
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    res.status(500).json({ message: "Error fetching activity logs", error: error.message });
  }
});
// Get activity logs by specific user ID (admin only)
router.get("/by-user/:userId", protectAdmin, async (req, res) => {
  try {
    const logs = await ActivityLog.find({ userId: req.params.userId }).populate("userId");
    res.json(logs);
  } catch (error) {
    console.error("Error fetching user activity logs:", error);
    res.status(500).json({ message: "Error fetching user activity logs", error: error.message });
  }
});
module.exports = router;
