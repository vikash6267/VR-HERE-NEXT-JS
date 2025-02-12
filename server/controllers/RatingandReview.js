const RatingAndReview = require("../models/RatingandReview");
const mongoose = require("mongoose");
const tifinModel = require("../models/tifinModel");
const roomModel = require("../models/roomModel");
const authModel = require("../models/authModel");

// Create a new rating and review
exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, roomId, tifinId } = req.body;

    let ratingReview;

    if (roomId) {
      const alreadyReviewed = await RatingAndReview.findOne({
        user: userId,
        room: roomId,
      });

      if (alreadyReviewed) {
        return res.status(403).json({
          success: false,
          message: "You already reviewed this PG",
        });
      }

      // Create a new rating and review
      ratingReview = await RatingAndReview.create({
        rating,
        review,
        room: roomId,
        user: userId,
      });

      // Add the rating and review to the room
      await roomModel.findByIdAndUpdate(roomId, {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      });

    } else if (tifinId) {
      const alreadyReviewed = await RatingAndReview.findOne({
        user: userId,
        tifin: tifinId,
      });
      if (alreadyReviewed) {
        return res.status(403).json({
          success: false,
          message: "You already reviewed this Tiffin Center",
        });
      }

      // Create a new rating and review
      ratingReview = await RatingAndReview.create({
        rating,
        review,
        tifin: tifinId,
        user: userId,
      });

      // Add the rating and review to the tifin center
      await tifinModel.findByIdAndUpdate(tifinId, {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Room ID or Tiffin ID must be provided",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Rating and review created successfully",
      ratingReview,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



exports.editRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, roomId, tifinId } = req.body;

    let ratingReview;

    if (roomId) {
      ratingReview = await RatingAndReview.findOne({
        user: userId,
        room: roomId,
      });
      if (!ratingReview) {
        return res.status(404).json({
          success: false,
          message: "No review found for this PG by the user",
        });
      }

      // Update the rating and review
      ratingReview.rating = rating;
      ratingReview.review = review;
      await ratingReview.save();

    } else if (tifinId) {
      ratingReview = await RatingAndReview.findOne({
        user: userId,
        tifin: tifinId,
      });
      if (!ratingReview) {
        return res.status(404).json({
          success: false,
          message: "No review found for this Tiffin Center by the user",
        });
      }

      // Update the rating and review
      ratingReview.rating = rating;
      ratingReview.review = review;
      await ratingReview.save();
    } else {
      return res.status(400).json({
        success: false,
        message: "Room ID or Tiffin ID must be provided",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Rating and review updated successfully",
      ratingReview,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.checkUserRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { roomId, tifinId } = req.body;

    let alreadyReviewed;

    if (roomId) {
      // Check if the user has already reviewed the room
      alreadyReviewed = await RatingAndReview.findOne({
        user: userId,
        room: roomId,
      });
    } else if (tifinId) {
      // Check if the user has already reviewed the tiffin center
      alreadyReviewed = await RatingAndReview.findOne({
        user: userId,
        tifin: tifinId,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Room ID or Tiffin ID must be provided",
      });
    }

    if (alreadyReviewed) {
      return res.status(200).json({
        success: true,
        message: "User has already reviewed",
        alreadyReviewed,
        hasReviewed: true,
      });
    } else {
      return res.status(200).json({
        success: true,
        hasReviewed: false,
        message: "User has not reviewed yet",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    
    });
  }
};

// Get the average rating for a course
exports.getAverageRatingTifin = async (req, res) => {
  try {
    const tifinId = req.body.tifinId;

    // Calculate the average rating using the MongoDB aggregation pipeline
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          tifin: new mongoose.Types.ObjectId(tifinId), // Convert tifinId to ObjectId
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    // If no ratings are found, return 0 as the default rating
    return res.status(200).json({ success: true, averageRating: 0 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating for the tiffin center",
      error: error.message,
    });
  }
};



exports.getAverageRatingRoom = async (req, res) => {
  try {
    const roomId = req.body.roomId;

    // console.log(roomId)
    // Calculate the average rating using the MongoDB aggregation pipeline
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          room: new mongoose.Types.ObjectId(roomId), // Convert tifinId to ObjectId
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    // If no ratings are found, return 0 as the default rating
    return res.status(200).json({ success: true, averageRating: 0 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating for the tiffin center",
      error: error.message,
    });
  }
};


// Get all rating and reviews
exports.getAllRatingReview = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image", // Specify the fields you want to populate from the "Profile" model
      })
      .populate({
        path: "course",
        select: "courseName", //Specify the fields you want to populate from the "Course" model
      })
      .exec();

    res.status(200).json({
      success: true,
      data: allReviews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating and review for the course",
      error: error.message,
    });
  }
};
