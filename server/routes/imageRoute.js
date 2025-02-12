const express = require("express")
const router = express.Router()



const {
    uploadImages
} = require("../controllers/imageCtrl")

router.post("/multi", uploadImages)


// export all router
module.exports = router


