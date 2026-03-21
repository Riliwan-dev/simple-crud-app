require('dotenv').config(); // 1. Load the environment variables
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware to parse JSON (Useful for CRUD later)
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// 2. Use the PORT from .env
const PORT = process.env.PORT || 3000;

// 3. Connect to the database using the variable
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connected to Database!');
    // It is best practice to start the server ONLY after the DB connects
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection failed:", error.message);
  });