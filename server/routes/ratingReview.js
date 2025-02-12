const express = require("express");
const {
    createRating,
    getAverageRatingTifin,
    getAverageRatingRoom,
    editRating,
    checkUserRating
} = require("../controllers/RatingandReview");
const { auth ,isUser} = require("../middleware/auth");
const router = express.Router();


router.post("/create", auth,isUser, createRating);
router.post("/edit", auth,isUser, editRating);
router.post("/avgratingtifin",  getAverageRatingTifin);
router.post("/avgratingroom",  getAverageRatingRoom);
router.post("/checkrating",auth,isUser,  checkUserRating);





module.exports = router;


