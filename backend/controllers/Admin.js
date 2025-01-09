require("dotenv").config();
const { Router } = require("express");
const User = require("../models/User"); // Assuming User model is defined with Sequelize
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = Router();

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username in the database
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour, adjust as needed
    });

    // Return token or any other data you want to send back
    res.status(200).json({ token: token, userId: user.id }); // Example response

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
