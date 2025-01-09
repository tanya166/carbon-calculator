require("dotenv").config();
const { Router } = require("express");
const User = require("../models/User"); // Assuming User model is defined with Sequelize
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = Router();
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password during signup:', hashPassword);

    // Create new user with hashed password
    const newUser = await User.create({ username, email, password: hashPassword });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, userId: newUser.id });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: "Invalid username" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('isPasswordValid:', isPasswordValid);
    console.log('Provided Password:', password);
    console.log('Stored Hashed Password:', user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token: token, userId: user.id });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;