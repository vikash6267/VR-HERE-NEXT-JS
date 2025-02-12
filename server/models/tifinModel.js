const mongoose = require("mongoose");

const tifinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],

    price: {
      type: String,
      required: true,
      trim: true,
    },
    menu: [
      {
        day: String,
        menu: String,
      },
    ],
    type: {
      type: String,
      required: true,
      trim: true,
    },
    customize: {
      type: String,
      required: true,
      trim: true,
    },
    Location: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    ratingAndReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
      },
    ],
    visits: {
      type: Number,
      default:0
    },
    tag: {
      type: [String],
      required: true,
    },
    leading: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        number: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tifin", tifinSchema);
