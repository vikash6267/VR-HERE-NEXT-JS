const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["room", "tifin", "admin"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    contact: {
      type: String,
    },
    token: {
      type: String,
    },
    // Subscription Fields
    subscription: {
      startDate: { type: Date },
      expiryDate: { type: Date },
      months: { type: Number },
      isActive: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("auth", authSchema);
