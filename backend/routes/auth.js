const express = require('express');
const router = express.Router(); // Create an Express router instance
const bcrypt = require('bcryptjs'); // Import bcryptjs
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken');

// Import necessary things later (User model, bcryptjs, jsonwebtoken)

// --- Define Routes ---

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
    // 1. Destructure request body
    const { username, email, password } = req.body;
  
    // 2. Basic Validation (Check if fields were sent)
    if (!username || !email || !password) {
      // Use 400 for Bad Request if data is missing
      return res.status(400).json({ message: 'Please provide username, email, and password.' });
    }
  
    try {
      // 3. Check if user already exists (by username or email)
      let existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        // Use 400 for Bad Request if user already exists
        return res.status(400).json({ message: 'User already exists with that email or username.' });
      }
  
      // 4. Hash the password
      // Generate a "salt" (random data to add to hashing) - 10 rounds is common/secure enough
      const salt = await bcrypt.genSalt(10);
      // Hash the password using the salt
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // 5. Create new user instance
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword, // Store the HASHED password
      });
  
      // 6. Save user to database
      await newUser.save();
  
      // 7. Send success response (DON'T send the password back, even hashed)
      // Status 201 means "Created"
      res.status(201).json({
        message: 'User registered successfully!',
        user: { // Only send back non-sensitive info
          id: newUser.id, // or newUser._id (MongoDB default)
          username: newUser.username,
          email: newUser.email,
          createdAt: newUser.createdAt // from timestamps: true
        }
      });
  
    } catch (err) {
      console.error('Registration Error:', err.message); // Log the specific error on the server
      // Use 500 for Internal Server Error if something else went wrong
      res.status(500).json({ message: 'Server error during registration.' });
    }
  });


// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    // 1. Destructure request body
    const { email, password } = req.body;

    // 2. Basic Validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }

    try {
        // 3. Find user by email
        const user = await User.findOne({ email }); // Find by email (must be unique)
        if (!user) {
            // Use 400 for consistency, avoids confirming if email exists or not
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // 4. Compare submitted password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Password doesn't match
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // 5. User is valid, create JWT Payload
        // The payload contains data you want to encode in the token
        const payload = {
            user: {
                id: user.id, // Include user ID for identifying the user later
                username: user.username // Maybe username for display? Keep payload small.
            }
        };

        // 6. Sign the JWT
        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Use the secret from .env
            { expiresIn: '1h' }, // Token options: e.g., expires in 1 hour
            (err, token) => { // Callback function
                if (err) throw err; // Handle signing error
                // Send the token back to the client
                res.status(200).json({ // 200 OK
                    message: 'Login successful!',
                    token: token, // The generated JWT
                    user: { // Optional: send back some user info again
                      id: user.id,
                      username: user.username,
                      email: user.email
                    }
                 });
            }
        );

    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ message: 'Server error during login.' });
    }
});


// Export the router so it can be used in server.js
module.exports = router;