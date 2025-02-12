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
  
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user"],
      required: true,
      default:"user"
    },
    image:{
        type:String,
        required:true
    },
 
    contact: {
      type: String,
    },
    token: {
      type: String,
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", authSchema);
