const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true, // Username is mandatory
    unique: true,   // Username must be unique across all users
    trim: true,     // Removes whitespace from beginning/end
    minlength: 3    // Username must be at least 3 characters
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Basic email format validation
    lowercase: true, // Store email in lowercase
    trim: true
  },
  password: {
    type: String,
    required: true,
    // We don't specify minlength here, as it applies to the *hashed* password.
    // Password strength rules are usually handled before hashing.
  },
  // You can add more fields later as needed:
  // wins: { type: Number, default: 0 },
  // losses: { type: Number, default: 0 },
  // rankPoints: { type: Number, default: 1000 },
  // etc...
  // Or link to a separate PlayerProfile model
}, {
  // Add timestamps to record when user was created and last updated
  timestamps: true
});

// Create the User model from the schema
const User = mongoose.model('User', UserSchema);

// Export the model so it can be used elsewhere in the application
module.exports = User;