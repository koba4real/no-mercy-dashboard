// Load environment variables from .env file
require('dotenv').config();

// Import required packages
const express = require('express');
const cors = require('cors');

// Create the Express app instance
const app = express();

// --- Middleware ---
// Enable CORS for all routes and origins (we can restrict this later if needed)
app.use(cors());

// Allow Express to parse JSON request bodies
app.use(express.json());
// Allow Express to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// --- Basic Route for Testing ---
// Define a GET route for the root URL ('/')
app.get('/', (req, res) => {
  // Send a simple JSON response
  res.json({ message: 'Welcome to the No Mercy Backend API!' });
});

// --- Server Activation ---
// Get the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});