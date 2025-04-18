const express = require('express');
const router = express.Router();
const PlayerProfile = require('../models/PlayerProfile'); // Import the profile model
const { protect } = require('../middleware/authMiddleware'); // Import the protection middleware

// --- Define Routes ---

// @route   GET api/player/me
// @desc    Get current logged-in user's player profile
// @access  Private (Requires JWT Authentication)
router.get('/me', protect, async (req, res) => {
    // 'protect' middleware runs first. If it passes, req.userId will be set.
    try {
        // Find the PlayerProfile associated with the user ID from the token
        // Use .populate() to optionally pull in fields from the linked User document
        const profile = await PlayerProfile.findOne({ user: req.userId })
                                             // .populate('user', ['username', 'email']); // Example: Get username/email too

        if (!profile) {
            return res.status(404).json({ message: 'Player profile not found for this user.' });
        }

        // Send the found profile data
        res.status(200).json(profile);

    } catch (err) {
        console.error('Error fetching player profile:', err.message);
        res.status(500).json({ message: 'Server error fetching profile.' });
    }
});

// Add more routes here later (e.g., maybe PUT api/player/update for updating stats - requires protection too)


// Export the router
module.exports = router;