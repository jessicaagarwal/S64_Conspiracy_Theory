const mongoose = require("mongoose");

const ShareSchema = new mongoose.Schema({
  theoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Theory", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sharedTo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Share", ShareSchema);
