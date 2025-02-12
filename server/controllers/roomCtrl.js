const locationModel = require("../models/locationModel");
const tifinModel = require("../models/tifinModel");
const roomModel = require("../models/roomModel");
const authModel = require("../models/authModel");
const slugify = require("slugify");

const createRoomCtrl = async (req, res) => {
  try {
    const {
      pgName,
      desc,
      price,
      depositeAmount,
      maintenance,
      noticePeriod,
      waterCharges,
      foodAvailable,
      ac,
      parking,
      powerBackup,
      AvailableForBoysOrGirl,
      totalRoom,
      images,
      contact,
      LocationID,
      closingTime,
      visitorEntry,
      vegNonveg,
      oppositeGender,
      smocking,
      drinking,
      wifi,
      pBackup,
      water,
      wordan,
      Laundry,
      tag: _tag,

    } = req.body;

    const userId = req.user.id;
    const imagesArray = JSON.parse(req.body.images);
    const tag = JSON.parse(_tag);

    if (!Array.isArray(tag) || !tag.length) {
      return res.status(400).json({ error: 'Tags must be a non-empty array' });
    }
    if (
      !pgName ||
      !desc ||
      !price ||

      !depositeAmount ||
      !maintenance ||
      !noticePeriod ||
      !waterCharges ||
      !foodAvailable ||
      !AvailableForBoysOrGirl ||
      !totalRoom ||
      !imagesArray ||
      !contact ||
      !LocationID ||
      !closingTime ||
      !visitorEntry ||
      !vegNonveg ||
      !oppositeGender ||
      !smocking ||
      !drinking ||
      !wifi ||


      !wordan ||
      !Laundry
    ) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const userDetails = await authModel.findById(userId);
    const location = await locationModel.findById(LocationID);

    const userName = userDetails?.name.split(" ")[0]; // Get the first name or adjust as needed
    const locationName = slugify(location?.name, { lower: true, strict: true });

    // Create the slug
    let slug = slugify(`${pgName} ${locationName} ${userName}`, {
      lower: true,
      strict: true,
    });

    const room = await roomModel.create({
      pgName,
      desc,
      slug,
      price,
      depositeAmount,
      maintenance,
      noticePeriod,
      waterCharges,
      foodAvailable,
      ac,
      parking,
      powerBackup,
      AvailableForBoysOrGirl,
      totalRoom,
      images: imagesArray,
      contact,
      Location: LocationID,
      closingTime,
      visitorEntry,
      vegNonveg,
      oppositeGender,
      smocking,
      drinking,
      wifi,
      wordan,
      Laundry,
      vendor: userId,
      tag
    });

    if (room) {
      await locationModel.findByIdAndUpdate(
        LocationID,
        { $push: { Room: room._id } },
        { new: true }
      );
    }

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in creating room!",
    });
  }
};

const addLeading = async (req, res) => {
  const { roomId, name, number, vendorName, tifinId } = req.body;
console.log(req.body)
  try {
    let data = [];
    if (vendorName === "room") {
      data = await roomModel.findById(roomId);
      console.log(data)
      const newLeading = { name, number };
      data.leading.push(newLeading);
    await data.save();

    } else {
      data = await tifinModel.findById(tifinId);
      console.log(data)
      const newLeading = { name, number };
      data.leading.push(newLeading);
    await data.save();

    }

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

  


    res
      .status(200)
      .json({ success: true, message: "Leading added successfully", data });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getAllRoomCtrl = async (req, res) => {
  try {
    const rooms = await roomModel
      .find({})
      .populate({
        path: "Location",
        select: "name",
      }).exec();

    return res.status(200).json({
      success: true,
      totalRoom: rooms.length,
      rooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in getting all rooms!",
      error: error.message,
    });
  }
};

const deleteRoomCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide id!",
      });
    }

    await roomModel.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Room delete successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in deleting Room!",
    });
  }
};

const updateRoomCtrl = async (req, res) => {
  try {
    const updateData = req.body;

    // // // Parse images if provided as a string
    // if (updateData.images && typeof updateData.images === "string") {
    //   updateData.images = JSON.parse(updateData.images);
    // }
     updateData.images = JSON.parse(updateData.images);
    
    console.log(updateData?.images)

    // return
    const room = await roomModel.findByIdAndUpdate(
      updateData?._id,
      { $set: updateData },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found!",
      });
    }

    // // Update Location only if it has changed
    // if (
    //   updateData.LocationID &&
    //   room.Location.toString() !== updateData.LocationID
    // ) {
    //   await locationModel.findByIdAndUpdate(room.Location, {
    //     $pull: { Room: room._id },
    //   });
    //   await locationModel.findByIdAndUpdate(updateData.LocationID, {
    //     $push: { Room: room._id },
    //   });
    // }

    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Error in updating room!",
      error: error.message,
    });
  }
};

const getAllLeadingByVendor = async (req, res) => {
  const vendorId = req.user.id; // Get the user ID from the request

  try {
    let data = [];
    // Find rooms by vendor ID
    const userDetails = await authModel.findById(vendorId);
    // console.log(userDetails)

    if (userDetails?.role === "room") {
      data = await roomModel.find({ vendor: vendorId }).select("leading");
    } else {
      data = await tifinModel.find({ vendor: vendorId }).select("leading");
    }

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No rooms found for this vendor" });
    }

    // Aggregate all leading entries
    const allLeading = data.flatMap((room) => room.leading);

    res.status(200).json({ success: true, leading: allLeading });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const findByVendor = async (req, res) => {
  const vendorID = req.user.id; // Get the user ID from the request
  // console.log(vendorID)
  try {
    const rooms = await roomModel
      .find({ vendor: vendorID })
      .populate({
        path: "Location",
        select: "name",
      })
      .exec();
    return res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in getting all rooms!",
      error: error.message,
    });
  }
};

const getSingelRoomCtrl = async (req, res) => {
  try {
    const { slug } = req.params;
    // console.log(req.params);
    const room = await roomModel
      .findOne({ slug })
      .populate({
        path: "Location",
        select: "name",
      })
      .populate({
        path: "ratingAndReviews",
        populate: {
          path: "user", // Populate the user field in RatingAndReview
        },
      }).populate({
        path: "vendor",
        select: "contact",
      })
      .exec();
    if (!room) {
      return res.status(400).json({
        success: false,
        message: "No room found with this id",
      });
    }

    room.visits = (room.visits || 0) + 1;
    await room.save();

    return res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in getting single room",
    });
  }
};

module.exports = {
  createRoomCtrl,
  getAllRoomCtrl,
  deleteRoomCtrl,
  updateRoomCtrl,
  addLeading,
  getAllLeadingByVendor,
  findByVendor,
  getSingelRoomCtrl,
};
