const contectModel = require("../models/contactModel");
const mailSender = require("../utills/mailSender");
const { mailContact } = require("../template/contact");

const createContactCtrl = async (req, res) => {
    try {
        const { name, email, contact, message } = req.body;
        if (!email || !name || !contact || !message) {
            return res.status(400).json({
                success: false,
                message: "Please Provide all fields"
            })
        }
        const newContact = await contectModel.create({
            name, email, contact, message, image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
        })

        if (newContact) {
            try {
                await mailSender(
                    "rishimaheshwari010@gmail.com",
                    "New Contact ",
                    mailContact(name, email, contact, message)
                );
            } catch (mailError) {
                console.error("Email Sending Error:", mailError);
            }
        }

        return res.status(201).json({
            success: true,
            message: "Message Send Successfully",
            newContact
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in creating contect "
        })
    }
}
module.exports = { createContactCtrl }