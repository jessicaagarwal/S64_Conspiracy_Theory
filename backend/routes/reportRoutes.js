const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const { protectAdmin } = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    // Check if userId query parameter is provided
    const { userId } = req.query;
    
    // If userId is provided, filter reports by that user
    const filter = userId ? { reportedBy: userId } : {};
    
    const reports = await Report.find(filter).populate("reportedBy theoryId");
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Error fetching reports", error: error.message });
  }
});
// Get reports by specific user ID (admin only)
router.get("/by-user/:userId", protectAdmin, async (req, res) => {
  try {
    const reports = await Report.find({ reportedBy: req.params.userId }).populate("reportedBy theoryId");
    res.json(reports);
  } catch (error) {
    console.error("Error fetching user reports:", error);
    res.status(500).json({ message: "Error fetching user reports", error: error.message });
  }
});
router.post("/", async (req, res) => {
  const newReport = new Report(req.body);
  await newReport.save();
  res.json(newReport);
});

module.exports = router;
