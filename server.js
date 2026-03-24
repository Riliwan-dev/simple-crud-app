// 1. IMPORTS
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const User = require('./src/models/userModel.js'); // Import your blueprint

const app = express();

// Middleware (This is the "Translator" for Postman)
app.use(express.json());

// --- ROUTES START HERE ---

// Basic Home Route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// CREATE: The Route to add a new user
app.post('/api/users', async (req, res) => {
    try {
        const user = await User.create(req.body); 
        res.status(201).json(user); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// The "READ" route - This gets all users from the database
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({}); // This tells MongoDB: "Give me everything!"
        res.status(200).json(users);      // Send the data back as a JSON list
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE (Put)
app.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE (Delete)
app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- ROUTES END HERE ---

const PORT = process.env.PORT || 3000;

// Connect to the database
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connected to Database!');
    
    // Start the server ONLY after the DB connects
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection failed:", error.message);
  });