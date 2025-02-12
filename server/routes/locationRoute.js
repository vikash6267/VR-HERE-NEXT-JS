const express = require("express")
const { createLocationCtrl, getAllLocationCtrl, deleteLocationCtrl, updateLocationCtrl, getAllLocation, getLocationCtrl } = require("../controllers/locationCtrl")
const router = express.Router()

router.post("/create", createLocationCtrl)
router.get("/getAll", getAllLocationCtrl)
router.get("/getlocations", getAllLocation)
router.get("/get/:id", getLocationCtrl)
router.delete("/delete/:id", deleteLocationCtrl)
router.put("/update/:id", updateLocationCtrl)

module.exports = router


