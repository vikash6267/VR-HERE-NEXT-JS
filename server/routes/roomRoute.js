const express = require("express");
const {
  createRoomCtrl,
  getAllRoomCtrl,
  deleteRoomCtrl,
  updateRoomCtrl,
  addLeading,
  getAllLeadingByVendor,
  findByVendor,
  getSingelRoomCtrl
} = require("../controllers/roomCtrl");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/create", auth, createRoomCtrl);
router.post("/addleads", addLeading);
router.get("/leading", auth, getAllLeadingByVendor);
router.get("/", auth, findByVendor);
router.get("/getAll", getAllRoomCtrl);
router.get("/get/:slug", getSingelRoomCtrl);
router.delete("/delete/:id", deleteRoomCtrl);
router.post("/update", updateRoomCtrl);

module.exports = router;
