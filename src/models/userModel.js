const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      trim: true,        // Removes accidental spaces like " Riliwan "
      minLength: [3, "Username must be at least 3 characters"],
      maxLength: [20, "Username cannot exceed 20 characters"]
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,   // Automatically converts "Bello@Email.com" to "bello@email.com"
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
        "Please enter a valid email address" 
      ] // This Regex checks for the @ and the .com
    },
    age: {
      type: Number,
      min: [0, "Age cannot be negative"],
      max: [120, "Please enter a valid age"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;