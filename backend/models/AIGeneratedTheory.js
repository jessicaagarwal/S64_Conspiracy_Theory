const mongoose = require("mongoose");

const AIGeneratedTheorySchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  generatedText: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AIGeneratedTheory", AIGeneratedTheorySchema);
