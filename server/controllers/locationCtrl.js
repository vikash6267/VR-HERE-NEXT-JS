const locationModel = require("../models/locationModel")

const createLocationCtrl = async (req, res) => {
    try {
        const { name, images } = req.body;
        if (!images || !name) {
            return res.status(400).json({
                success: false,
                message: "Please Provide All Fields"
            })
        }
        const imagesArray = typeof images === 'string' ? JSON.parse(images) : images;

        const location = await locationModel.create({
            name,
            images: imagesArray
        })

        return res.status(201).json({
            success: true,
            message: "Location created successfully",
            location
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in creating location!"
        })
    }
}

const getAllLocationCtrl = async (req, res) => {
    try {
        const locations = await locationModel.find({}).populate("Room").populate("Tifin").exec();
        if (!locations) {
            return res.status(400).json({
                success: false,
                message: "No location found!"
            })
        }
        return res.status(200).json({
            success: true,
            totalLocation: locations.length,
            locations
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in getting all location!"
        })
    }
}
const deleteLocationCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide id!"
            })
        }

        await locationModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Location delete successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in deleting location!"
        })
    }
}


const getAllLocation = async (req, res) => {
    try {
        const locations = await locationModel.find({})
        if (!locations) {
            return res.status(400).json({
                success: false,
                message: "No location found!"
            })
        }
        return res.status(200).json({
            success: true,
            totalLocation: locations.length,
            locations
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in getting all location!"
        })
    }
}

const updateLocationCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, images, rooms, tifins } = req.body;

        const location = await locationModel.findById(id);
        if (!location) {
            return res.status(404).json({
                success: false,
                message: "Location not found"
            });
        }

        if (name) {
            location.name = name.trim();
        }

        if (images) {
            const imagesArray = typeof images === 'string' ? JSON.parse(images) : images;

            if (!Array.isArray(imagesArray) || imagesArray.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Images should be a non-empty array"
                });
            }

            for (let img of imagesArray) {
                if (typeof img !== 'object' || !img.public_id || !img.url) {
                    return res.status(400).json({
                        success: false,
                        message: "Each image should be an object with 'public_id' and 'url'"
                    });
                }
            }

            location.images = imagesArray;
        }

        if (rooms) {
            const roomsArray = typeof rooms === 'string' ? JSON.parse(rooms) : rooms;

            if (!Array.isArray(roomsArray)) {
                return res.status(400).json({
                    success: false,
                    message: "Rooms should be an array"
                });
            }

            location.Room = roomsArray;
        }

        if (tifins) {
            const tifinsArray = typeof tifins === 'string' ? JSON.parse(tifins) : tifins;

            if (!Array.isArray(tifinsArray)) {
                return res.status(400).json({
                    success: false,
                    message: "Tifins should be an array"
                });
            }

            location.Tifin = tifinsArray;
        }

        await location.save();

        return res.status(200).json({
            success: true,
            message: "Location updated successfully",
            location
        });
    } catch (error) {
        console.error("Error in updateLocationCtrl:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating location!"
        });
    }
}


const getLocationCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await locationModel.findById(id)

        if (!location) {
            return res.status(400).json({
                success: false,
                message: "No location found with this id",
            });
        }


        return res.status(200).json({
            success: true,
            location,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in getting single location",
        });
    }
};
module.exports = { createLocationCtrl, getAllLocationCtrl, deleteLocationCtrl, updateLocationCtrl, getAllLocation, getLocationCtrl }