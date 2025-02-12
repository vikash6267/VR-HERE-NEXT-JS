const express = require("express");
const {
  createTifinCtrl,
  getAllTifinCtrl,
  deleteTifinCtrl,
  updateTifinCtrl,
  findByVendor,
  editTifinCtrl,
  getSingelTifinCtrl,
} = require("../controllers/tifinCtrl");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/create", auth, createTifinCtrl);
router.post("/update", auth, editTifinCtrl);
router.get("/getAll", getAllTifinCtrl);
router.delete("/delete/:id", deleteTifinCtrl);
router.put("/update/:id", updateTifinCtrl);
router.get("/get/:slug", getSingelTifinCtrl);

router.get("/", auth, findByVendor);

module.exports = router;
