const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    images: [
        {
            public_id: String,
            url: String,
        },
    ],
    Room: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room"
        }
    ],
    Tifin: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tifin"
        }
    ]
}, { timestamps: true });


module.exports = mongoose.model('Location', locationSchema);

