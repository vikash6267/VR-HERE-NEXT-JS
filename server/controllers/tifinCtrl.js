const tifinModel = require("../models/tifinModel")
const locationModel = require("../models/locationModel")
const authModel = require("../models/authModel");
const slugify = require('slugify');

const createTifinCtrl = async (req, res) => {
    try {
        const { name, images, price, menu, type, customize, tag: _tag, LocationID } = req.body;

        const userId = req.user.id;


        const tag = JSON.parse(_tag);


        if (!Array.isArray(tag) || !tag.length) {
            return res.status(400).json({ error: 'Tags must be a non-empty array' });
        }


        // console.log(name, images, price, menu, type, customize, LocationID )
        if (!name || !price || !menu || !type || !customize || !LocationID) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        const imagesArray = typeof images === 'string' ? JSON.parse(images) : images;
        const menuArray = JSON.parse(menu);
        console.log(menuArray)


        const userDetails = await authModel.findById(userId)
        const location = await locationModel.findById(LocationID)


        const userName = userDetails?.name.split(' ')[0]; // Get the first name or adjust as needed
        const locationName = slugify(location?.name, { lower: true, strict: true });

        // Create the slug
        let slug = slugify(`${name} ${locationName} ${userName}`, { lower: true, strict: true });

        const newTifin = await tifinModel.create({
            name,
            images: imagesArray,
            price,
            slug,
            menu: menuArray,
            type,
            tag,
            customize,
            vendor: userId,
            Location: LocationID
        });

        if (newTifin) {
            await locationModel.findByIdAndUpdate(LocationID, { $push: { Tifin: newTifin._id } }, { new: true });
        }

        return res.status(201).json({
            success: true,
            message: "Tifin created successfully",
            tifin: newTifin
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error in creating tifin!",
            error: error.message
        });
    }
};

const getAllTifinCtrl = async (req, res) => {
    try {
        const tifins = await tifinModel.find({}).populate({
            path: "Location",
            select: "name"
        }).exec();
        return res.status(200).json({
            success: true,
            totalTifin: tifins.length,
            tifins
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in getting all tifin!",
            error: error.message
        });
    }
};

const deleteTifinCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide id!"
            })
        }

        await tifinModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Tifin delete successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in deleting Tifin!"
        })
    }
}

const updateTifinCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        if (updateFields.images && typeof updateFields.images === 'string') {
            updateFields.images = JSON.parse(updateFields.images);
        }



        const updatedTifin = await tifinModel.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedTifin) {
            return res.status(404).json({
                success: false,
                message: "Tifin not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tifin updated successfully",
            tifin: updatedTifin
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in updating tifin!",
            error: error.message
        });
    }
};

const findByVendor = async (req, res) => {
    const vendorID = req.user.id; // Get the user ID from the request
    // console.log(vendorID)
    try {
        const tifin = await tifinModel
            .find({ vendor: vendorID })
            .populate({
                path: "Location",
                select: "name",
            })
            .exec();
        return res.status(200).json({
            success: true,
            tifin,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in getting all TIFIN CENTER!",
            error: error.message,
        });
    }
};

const editTifinCtrl = async (req, res) => {
    try {
        const { price, menu, id } = req.body;

        if (!price || !menu) {
            return res.status(400).json({
                success: false,
                message: "Please provide both price and menu fields"
            });
        }

        // Parse menu if it is sent as a JSON string
        const menuArray = typeof menu === 'string' ? JSON.parse(menu) : menu;

        // Find the Tifin by ID and update
        const updatedTifin = await tifinModel.findByIdAndUpdate(
            id,
            {
                price,
                menu: menuArray,
            },
            { new: true }
        );

        if (!updatedTifin) {
            return res.status(404).json({
                success: false,
                message: "Tifin not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tifin updated successfully",
            tifin: updatedTifin
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in updating tifin",
            error: error.message
        });
    }
};


const getSingelTifinCtrl = async (req, res) => {
    try {
        const { slug } = req.params;
        // console.log(req.params);
        const tifin = await tifinModel
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
        if (!tifin) {
            return res.status(400).json({
                success: false,
                message: "No Tifin found with this id",
            });
        }

        tifin.visits = (tifin.visits || 0) + 1;
        await tifin.save();

        return res.status(200).json({
            success: true,
            tifin,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in getting single tifin",
        });
    }
};

module.exports = { createTifinCtrl, getAllTifinCtrl, deleteTifinCtrl, updateTifinCtrl, findByVendor, editTifinCtrl, getSingelTifinCtrl }