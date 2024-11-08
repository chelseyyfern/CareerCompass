//index.js

const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();
const bcrypt = require('bcrypt');
const path = require("path");

// models
const UsersModel = require("./models/Users"); // Import Users model

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://rachelaranjo:rachel123@cluster1.rr3or.mongodb.net/career");

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully');
});

// Route for user registration
app.post('/register', async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  // Validate incoming data (ensure all fields are provided)
  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if username or email already exists in the database
  const existingUser = await UsersModel.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ message: "Username or email already exists" });
  }

  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = await UsersModel.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role: 'job_seeker', // Default role
      verified: false, // Default verification status
      subscriptionType: 'basic', // Default subscription
    });

    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating user", error: err.message });
  }
});

// Route for user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate incoming data
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    // Find the user by username
    const user = await UsersModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Respond with user data (excluding password)
    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});






// Server Listening
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});