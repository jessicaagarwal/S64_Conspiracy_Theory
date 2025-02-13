const express = require("express");
const router = express.Router();
const ActivityLog = require("../models/ActivityLog");

router.get("/", async (req, res) => {
  const logs = await ActivityLog.find().populate("userId");
  res.json(logs);
});

module.exports = router;
