const express = require("express");
const router = express.Router();
const Theory = require("../models/Theory");
const Tag = require("../models/Tag");
const { protect, protectAdmin } = require("../middleware/authMiddleware");
const ActivityLog = require("../models/ActivityLog");

// Get all theories
router.get("/", async (req, res) => {
  try {
    // Check if userId query parameter is provided
    const { userId } = req.query;
    
    // If userId is provided, filter theories by that user
    const filter = userId ? { createdBy: userId } : {};
    
    const theories = await Theory.find(filter).populate("tags createdBy");
    res.json(theories);
  } catch (error) {
    console.error("Error fetching theories:", error);
    res.status(500).json({ message: "Error fetching theories", error: error.message });
  }
});
// Get theories by specific user ID (admin only)
router.get("/by-user/:userId", protectAdmin, async (req, res) => {
  try {
    const theories = await Theory.find({ createdBy: req.params.userId }).populate("tags createdBy");
    res.json(theories);
  } catch (error) {
    console.error("Error fetching user theories:", error);
    res.status(500).json({ message: "Error fetching user theories", error: error.message });
  }
});
// Get theories created by the authenticated user
router.get("/user", protect, async (req, res) => {
  try {
    const theories = await Theory.find({ createdBy: req.user._id }).populate("tags createdBy");
    res.json(theories);
  } catch (error) {
    console.error("Error fetching user theories:", error);
    res.status(500).json({ message: "Error fetching user theories", error: error.message });
  }
});

// Create a new theory
router.post("/", protect, async (req, res) => {
  try {
    const theoryData = { ...req.body, createdBy: req.user._id };
    
    // Handle tags if they are provided as strings (names) instead of ObjectIds
    if (theoryData.tags && Array.isArray(theoryData.tags)) {
      // Array of tag names
      const tagNames = theoryData.tags;
      const tagIds = [];
      
      // For each tag name, find or create a Tag document
      for (const tagName of tagNames) {
        // Try to find existing tag
        let tag = await Tag.findOne({ name: tagName });
        
        // If tag doesn't exist, create it
        if (!tag) {
          tag = new Tag({ name: tagName });
          await tag.save();
        }
        
        // Add the tag ID to the array
        tagIds.push(tag._id);
      }
      
      // Replace the tag names with the tag IDs
      theoryData.tags = tagIds;
    }
    
    // Create and save the theory
    const newTheory = new Theory(theoryData);
    await newTheory.save();
    
    // Log activity
    await ActivityLog.create({
      userId: req.user._id,
      action: "Created theory"
    });
    
    // Populate the tags and createdBy for the response
    const populatedTheory = await Theory.findById(newTheory._id).populate("tags createdBy");
    
    res.json(populatedTheory);
  } catch (error) {
    console.error("Error creating theory:", error);
    res.status(500).json({ message: "Error creating theory", error: error.message });
  }
});

// Update a theory
router.put("/:id", protect, async (req, res) => {
  try {
    // Check if the theory exists
    const theory = await Theory.findById(req.params.id);
    
    if (!theory) {
      return res.status(404).json({ message: "Theory not found" });
    }
    
    // Check if the user is the creator of the theory
    if (theory.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update this theory" });
    }
    
    const theoryData = { ...req.body };
    
    // Handle tags if they are provided as strings (names) instead of ObjectIds
    if (theoryData.tags && Array.isArray(theoryData.tags)) {
      // Array of tag names
      const tagNames = theoryData.tags;
      const tagIds = [];
      
      // For each tag name, find or create a Tag document
      for (const tagName of tagNames) {
        // Try to find existing tag
        let tag = await Tag.findOne({ name: tagName });
        
        // If tag doesn't exist, create it
        if (!tag) {
          tag = new Tag({ name: tagName });
          await tag.save();
        }
        
        // Add the tag ID to the array
        tagIds.push(tag._id);
      }
      
      // Replace the tag names with the tag IDs
      theoryData.tags = tagIds;
    }
    
    const updatedTheory = await Theory.findByIdAndUpdate(req.params.id, theoryData, { new: true }).populate("tags createdBy");
    
    // Log activity
    await ActivityLog.create({
      userId: req.user._id,
      action: "Updated theory"
    });
    
    res.json(updatedTheory);
  } catch (error) {
    console.error("Error updating theory:", error);
    res.status(500).json({ message: "Error updating theory", error: error.message });
  }
});

// Delete a theory
router.delete("/:id", protect, async (req, res) => {
  try {
    // Check if the theory exists
    const theory = await Theory.findById(req.params.id);
    
    if (!theory) {
      return res.status(404).json({ message: "Theory not found" });
    }
    
    // Check if the user is the creator of the theory
    if (theory.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this theory" });
    }
    
    await theory.deleteOne();
    
    // Log activity
    await ActivityLog.create({
      userId: req.user._id,
      action: "Deleted theory"
    });
    
    res.json({ message: "Theory deleted" });
  } catch (error) {
    console.error("Error deleting theory:", error);
    res.status(500).json({ message: "Error deleting theory", error: error.message });
  }
});

module.exports = router;