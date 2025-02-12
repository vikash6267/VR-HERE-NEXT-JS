const express = require("express")
const { registerCtrl, loginCtrl, subscribe, getVendorById } = require("../controllers/authCtrl")
const { userRegister, userLogin } = require("../controllers/userCtrl")
const router = express.Router()


router.post("/login", loginCtrl)
router.post("/register", registerCtrl)
router.get("/get/:id", getVendorById)
router.post("/subscribe", subscribe)


router.post("/userlogin", userLogin)
router.post("/userregister", userRegister)

module.exports = router