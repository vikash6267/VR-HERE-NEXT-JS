const express = require("express")
const { visits, } = require("../controllers/common")
const { auth } = require("../middleware/auth")
const router = express.Router()



router.get("/visits",auth,visits)
// router.get("/tifinVisit/:id",auth,roomVisits)

module.exports = router

