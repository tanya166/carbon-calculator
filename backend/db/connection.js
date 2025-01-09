require('dotenv').config(); // Load environment variables
const mysql = require('mysql'); // Require MySQL package

// MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Export the db connection
module.exports = db;

