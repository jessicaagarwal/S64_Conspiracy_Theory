const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { protect, protectAdmin, generateToken } = require("../middleware/authMiddleware");
const ActivityLog = require("../models/ActivityLog");

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      // Log activity
      await ActivityLog.create({
        userId: user._id,
        action: "User registered"
      });

    res.cookie('token', generateToken(user._id), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'Strict', // Adjust as necessary
    });
    res.status(201).json({

        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  // @route   POST /api/users/login
  // @desc    Authenticate a user
  // @access  Public

  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Log activity
    await ActivityLog.create({
      userId: user._id,
      action: "User logged in"
    });

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  // @route   POST /api/users/logout
  // @desc    Logout a user
  // @access  Public
  res.clearCookie('token');

  res.json({ message: "Logged out successfully" });
});

router.get("/profile", protect, async (req, res) => {

  try {
    const user = await User.findById(req.user._id).select("-password");
    
    if (user) {
      res.json(user);
      res.cookie('token', generateToken(req.user._id), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Set to true in production
          sameSite: 'Strict', // Adjust as necessary
      });

    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.get("/", protectAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    // Check if user is updating their own profile
    if (req.user._id.toString() !== req.params.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { username, email, password } = req.body;
    const user = await User.findById(req.params.id);

    if (user) {
      user.username = username || user.username;
      user.email = email || user.email;
      
      // Update password if provided
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      const updatedUser = await user.save();

      // Log activity
      await ActivityLog.create({
        userId: user._id,
        action: "User updated profile"
      });

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    // Check if user is deleting their own profile
    if (req.user._id.toString() !== req.params.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();

      // Log activity
      await ActivityLog.create({
        userId: user._id,
        action: "User deleted account"
      });

      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
