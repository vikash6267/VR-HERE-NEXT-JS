const mongoose = require("mongoose");

// Define the RatingAndReview schema
const ratingAndReviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	rating: {
		type: Number,
		required: true,
	},
	review: {
		type: String,
		required: true,
	},
	tifin: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Tifin",
		index: true,
	},
	room: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Room",
		index: true,
	},
	
},
{ timestamps: true }
);


// Export the RatingAndReview model
module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);
