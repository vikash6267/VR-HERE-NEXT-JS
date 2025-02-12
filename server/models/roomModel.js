const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    pgName: {
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
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    depositeAmount: {
      type: String,
      required: true,
      trim: true,
    },
    maintenance: {
      type: String,
      required: true,
      trim: true,
    },
    noticePeriod: {
      type: String,
      required: true,
      trim: true,
    },
    waterCharges: {
      type: String,
      required: true,
      trim: true,
    },
    foodAvailable: {
      type: String,
      required: true,
      trim: true,
    },
    ac: {
      type: String,
      trim: true,
    },
    parking: {
      type: String,
      trim: true,
    },
    powerBackup: {
      type: String,
      trim: true,
    },
    AvailableForBoysOrGirl: {
      type: String,
      required: true,
      trim: true,
    },
    totalRoom: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    contact: {
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
    closingTime: {
      type: String,
      required: true,
      trim: true,
    },
    visitorEntry: {
      type: String,
      required: true,
      trim: true,
    },
    vegNonveg: {
      type: String,
      required: true,
      trim: true,
    },
    oppositeGender: {
      type: String,
      required: true,
      trim: true,
    },
    smocking: {
      type: String,
      required: true,
      trim: true,
    },
    drinking: {
      type: String,
      required: true,
      trim: true,
    },
    wifi: {
      type: String,
      required: true,
      trim: true,
    },
    pBackup: {
      type: String,
      // required: true,
      trim: true,
    },
    water: {
      type: String,
      // required: true,
      trim: true,
    },
    wordan: {
      type: String,
      required: true,
      trim: true,
    },
    Laundry: {
      type: String,
      required: true,
      trim: true,
    },
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
      default: 0
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

module.exports = mongoose.model("Room", roomSchema);
