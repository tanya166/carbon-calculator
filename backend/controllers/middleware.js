require("dotenv").config(); // Load environment variables
const jwt = require("jsonwebtoken"); // Import jsonwebtoken

// Middleware to check if a user is logged in
const isLoggedIn = async (req, res, next) => {
    try {
        // Check for auth header
        if (req.headers.authorization) {
            // Get the token from header and parse it
            const token = req.headers.authorization.split(" ")[1]; // Bearer <token>, so we split at the space and get the second part
            if (token) {
                const payload = await jwt.verify(token, process.env.JWT_SECRET);
                if (payload) {
                    // Store user data in req object
                    req.user = payload;
                    next();
                } else {
                    res.status(400).json({ error: "token verification failed" });
                }
            } else {
                res.status(400).json({ error: "malformed auth header" });
            }
        } else {
            res.status(400).json({ error: "no auth header" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error: " + error.message });
    }
};

module.exports = {
    isLoggedIn,
};
