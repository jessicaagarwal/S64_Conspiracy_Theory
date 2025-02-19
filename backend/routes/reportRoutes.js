const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

router.get("/", async (req, res) => {
  const reports = await Report.find().populate("reportedBy theoryId");
  res.json(reports);
});

router.post("/", async (req, res) => {
  const newReport = new Report(req.body);
  await newReport.save();
  res.json(newReport);
});

module.exports = router;
