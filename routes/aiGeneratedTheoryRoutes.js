const express = require("express");
const router = express.Router();
const AIGeneratedTheory = require("../models/AIGeneratedTheory");

router.get("/", async (req, res) => {
  const theories = await AIGeneratedTheory.find().populate("userId");
  res.json(theories);
});

module.exports = router;
