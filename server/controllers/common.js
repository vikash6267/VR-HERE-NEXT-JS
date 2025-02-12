const tifinModel = require("../models/tifinModel");
const roomModel = require("../models/roomModel");
const authModel = require("../models/authModel");


exports.visits = async (req, res) => {

  const vendorId = req.user.id; // Get the user ID from the request
  try {
    let data = [];
    // Find rooms by vendor ID
    const userDetails = await authModel.findById(vendorId);

    if (userDetails?.role === "room") {
      data = await roomModel.find({ vendor: vendorId }).select("visits");
    } else {
      data = await tifinModel.find({ vendor: vendorId }).select("visits");
    }

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Data found for this vendor" });
    }


    res.json({
      success: true,
      message: "Visit Get successfully!",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


