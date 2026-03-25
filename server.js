// 1. IMPORTS
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./src/routes/userRoutes'); // Import the "Waiter"

const app = express();

// 2. MIDDLEWARE
app.use(express.json()); // Essential for Postman to work

// 3. ROUTES
// This single line replaces all your old app.get, post, put, and delete blocks
app.use('/api/users', userRoute); 

// Basic Home Route (Optional - just to check if server is live)
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// 4. DATABASE CONNECTION & SERVER START
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connected to Database!');
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection failed:", error.message);
  });