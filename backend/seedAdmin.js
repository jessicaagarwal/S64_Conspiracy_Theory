require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

// Admin user data
const adminData = {
  username: 'admin',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'superadmin'
};

// Function to seed the admin user
const seedAdmin = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: adminData.username });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    // Create the admin user
    const admin = new Admin({
      username: adminData.username,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role
    });

    // Save the admin user
    await admin.save();
    console.log('Admin user created successfully');
    console.log('Admin credentials:');
    console.log(`Username: ${adminData.username}`);
    console.log(`Password: ${adminData.password}`);
    console.log(`Role: ${adminData.role}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

// Run the seed function
seedAdmin();