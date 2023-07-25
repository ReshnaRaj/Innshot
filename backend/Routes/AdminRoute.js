const express = require("express");
const router = express.Router();
const { adminlogin, isAdminAuth } = require("../Controller/authController");

const {
  getallresortdata,
  getuniqueresortdata,
  getalladvdata,
  getuniqadvdata,
  approveAdvent,
  getalldestdata,
  getuniquedest,
  approveDestination,
  getAllstaffData,
  blockStaff,
  rejectResort,
  approvedresort,
  getallbookings,
} = require("../Controller/AdminController.js");
const { checkAdmin } = require("../Middleware/authuser");
router.post("/adlogin", adminlogin);
router.get("/getallresortdata", getallresortdata);
router.get("/getuniqueresort/:id", getuniqueresortdata);
// router.post('/approveresort/:id',approveresort)
router.get("/isAdminauth", checkAdmin, isAdminAuth);
router.get("/getalladvdata", checkAdmin, getalladvdata);
router.get("/getuniqadv/:id", checkAdmin, getuniqadvdata);
router.post("/approveadvent/:id", checkAdmin, approveAdvent);
router.get("/getalldestdata", checkAdmin, getalldestdata);
router.get("/getuniqdest/:id", checkAdmin, getuniquedest);
router.post("/approvedest/:id", checkAdmin, approveDestination);
router.get("/getAllstaff", checkAdmin, getAllstaffData);
router.post("/blockstaff/:id", checkAdmin, blockStaff);
router.post("/rejectresort/:id", checkAdmin, rejectResort);
router.post("/approvedresort/:id", checkAdmin, approvedresort);
router.get("/getallbookings", checkAdmin, getallbookings);

module.exports = router;
