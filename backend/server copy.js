require("dotenv").config(); // Load environment variables
const express = require("express"); // Import express
const morgan = require("morgan"); // Import morgan
const { log } = require("mercedlogger"); // Import mercedlogger's log function
const cors = require("cors"); // Import cors
const UserRouter = require("./controllers/User"); // Import the User router
const { isLoggedIn } = require("./controllers/middleware"); // Import isLoggedIn middleware
const sequelize = require("./db/connection"); // Import Sequelize instance for database connection

// Destructure environment variables
const { PORT = 3000 } = process.env;

// Create express app
const app = express();

// Middleware
app.use(cors()); // Enable cors
app.use(morgan("tiny")); // Enable morgan
app.use(express.json()); // Enable express to parse json

// Test database connection
sequelize.authenticate()
    .then(() => {
        log.green("Database connected...");
    })
    .catch(err => {
        log.red("Unable to connect to the database:", err);
    });

// Routes
app.get("/", isLoggedIn, (req, res) => {
    res.status(200).json({ hello: "World" });
});

app.use("/user", UserRouter); // Send all "/user" requests to UserRouter for routing

// Catch all route
app.get("*", (req, res) => {
    res.status(404).json({ error: "Not Found" });
});

// Listen
app.listen(PORT, () => {
    log.green("Server is running on port", PORT);
});

