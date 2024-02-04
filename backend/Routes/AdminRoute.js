const express = require("express");
const router = express.Router();
const { adminlogin, isAdminAuth } = require("../Controller/authController");
const { checkAdmin } = require("../Middleware/authuser");
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

router.post("/adLogin",adminlogin);
router.get("/getAllResortData", getallresortdata);
router.get("/getUniqueResort/:id", getuniqueresortdata);
 
router.get("/isAdminauth",checkAdmin,isAdminAuth);
router.get("/getAllAdvData", checkAdmin, getalladvdata);
router.get("/getUniqAdv/:id", checkAdmin, getuniqadvdata);
router.post("/approveAdvent/:id", checkAdmin, approveAdvent);
router.get("/getAllDestData", checkAdmin, getalldestdata);
router.get("/getUniqDest/:id", checkAdmin, getuniquedest);
router.post("/approveDest/:id", checkAdmin, approveDestination);
router.get("/getAllstaff", checkAdmin, getAllstaffData);
router.post("/blockStaff/:id", checkAdmin, blockStaff);
router.post("/rejectResort/:id", checkAdmin, rejectResort);
router.post("/approvedResort/:id", checkAdmin, approvedresort);
router.get("/getAllBookings", checkAdmin, getallbookings);

module.exports = router;
