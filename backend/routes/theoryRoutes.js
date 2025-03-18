const express = require("express");
const router = express.Router();
const Theory = require("../models/Theory");
const Tag = require("../models/Tag");

router.get("/", async (req, res) => {
  const theories = await Theory.find().populate("tags createdBy");
  res.json(theories);
});

router.post("/", async (req, res) => {
  try {
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
    
    // Create and save the theory
    const newTheory = new Theory(theoryData);
    await newTheory.save();
    
    // Populate the tags for the response
    const populatedTheory = await Theory.findById(newTheory._id).populate("tags");
    
    res.json(populatedTheory);
  } catch (error) {
    console.error("Error creating theory:", error);
    res.status(500).json({ message: "Error creating theory", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
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
    
    const updatedTheory = await Theory.findByIdAndUpdate(req.params.id, theoryData, { new: true }).populate("tags");
    res.json(updatedTheory);
  } catch (error) {
    console.error("Error updating theory:", error);
    res.status(500).json({ message: "Error updating theory", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  await Theory.findByIdAndDelete(req.params.id);
  res.json({ message: "Theory deleted" });
});

module.exports = router;
