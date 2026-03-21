const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true, // This prevents two people from using the same email
    },
    age: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// We turn the Schema into a Model named "User"
const User = mongoose.model("User", UserSchema);

module.exports = User;