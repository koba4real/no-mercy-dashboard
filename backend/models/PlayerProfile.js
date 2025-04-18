const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the PlayerProfile Schema
const PlayerProfileSchema = new Schema({
    // Link to the User model
    user: {
        type: Schema.Types.ObjectId, // Special type for MongoDB Object IDs
        ref: 'User',                 // Refers to the 'User' model we already defined
        required: true,              // Each profile MUST be linked to a user
        unique: true                 // Each user should only have one profile
    },
    cumulativeScore: {
        type: Number,
        required: true,
        default: 0  // Start everyone at 0 score
    },
    totalWins: {
        type: Number,
        required: true,
        default: 0  // Start with 0 wins
    },
    totalLosses: {
        type: Number,
        required: true,
        default: 0  // Start with 0 losses
    }
    // Add more game-specific stats here later if needed
}, {
    // Optional: Add timestamps if you want to track when the profile itself was created/updated
     timestamps: true
   });

// Create the PlayerProfile model from the schema
// Mongoose will create a 'playerprofiles' collection in MongoDB
const PlayerProfile = mongoose.model('PlayerProfile', PlayerProfileSchema);

// Export the model
module.exports = PlayerProfile;