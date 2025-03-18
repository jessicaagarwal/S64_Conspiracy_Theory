require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Tag = require('./models/Tag');
const Theory = require('./models/Theory');

// Mock theories from HomePage.jsx
const mockTheories = [
  {
    title: 'The Truth About Aliens',
    content: 'Did you know that aliens is actually controlled by government? The evidence dates back to 1985. Insiders claim that technology was created to distract us from this truth.',
    keywords: ['aliens', 'government', 'technology'],
    likes: 42
  },
  {
    title: 'The Truth About Illuminati',
    content: 'The secret connection between illuminati and celebrities has been hidden from the public for decades. Research suggests that media was engineered to cover up this relationship.',
    keywords: ['illuminati', 'celebrities', 'media'],
    likes: 78
  },
  {
    title: 'The Truth About Moon Landing',
    content: 'Government documents reveal that moon landing was invented by nasa to monitor conspiracy. This operation has been active since 1969 and explains why aliens keeps appearing in the media.',
    keywords: ['moon landing', 'nasa', 'conspiracy'],
    likes: 56
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await Tag.deleteMany({});
    await Theory.deleteMany({});
    console.log('Cleared existing data');

    // Create unique tags from all keywords
    const allKeywords = [...new Set(mockTheories.flatMap(theory => theory.keywords))];
    const tagPromises = allKeywords.map(keyword => 
      new Tag({ name: keyword }).save()
    );
    const tags = await Promise.all(tagPromises);
    console.log(`Created ${tags.length} tags`);

    // Create a map of keyword to tag ID for easy lookup
    const keywordToTagId = {};
    tags.forEach(tag => {
      keywordToTagId[tag.name] = tag._id;
    });

    // Create theories with references to tags
    const theoryPromises = mockTheories.map(mockTheory => {
      const tagIds = mockTheory.keywords.map(keyword => keywordToTagId[keyword]);
      
      return new Theory({
        title: mockTheory.title,
        content: mockTheory.content,
        tags: tagIds,
        likes: mockTheory.likes,
        shares: 0 // Default value
      }).save();
    });

    const createdTheories = await Promise.all(theoryPromises);
    console.log(`Created ${createdTheories.length} theories`);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();