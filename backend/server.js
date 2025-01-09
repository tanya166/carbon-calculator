require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3001'
}));
const port = 3000;

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

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Signup route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  db.query('SELECT username FROM users WHERE username = ?', [username], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
    if (result.length > 0) {
      return res.status(400).json({ msg: 'Username already exists' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error' });
      }

      // Insert user into database
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: 'Server error' });
        }
        res.status(201).json({ msg: 'User registered successfully' });
      });
    });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username exists
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }

    // Compare password
    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid username or password !! ' });
      }

      res.status(200).json({ msg: 'Login successfull !!' });
    });
  });
});

// Fetch data from table2
app.get('/api/table2', (req, res) => {
  db.query('SELECT * FROM table2', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
    res.json(results);
  });
});

// Fetch data from details
app.get('/api/details', (req, res) => {
  db.query('SELECT * FROM details', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
    res.json(results);
  });
});

// Contact Us route
app.post('/api/contact', (req, res) => {
  const { email, message } = req.body;

  // Insert contact message into database
  db.query('INSERT INTO support (email, message) VALUES (?, ?)', [email, message], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
    res.status(201).json({ msg: 'Message received successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
