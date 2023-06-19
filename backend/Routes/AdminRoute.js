const express = require('express')
const router = express.Router()
const {adminlogin,isAdminAuth}=require('../Controller/authController')
const {getallresortdata}=require('../Controller/StaffController')
const {approveresort,getuniqueresortdata}=require('../Controller/adminController')
const {checkAdmin}=require('../Middleware/authuser')
router.post('/adlogin',adminlogin)
router.get('/getallresortdata',getallresortdata)
router.get('/getuniqueresort/:id',getuniqueresortdata)
router.post('/approveresort/:id',approveresort)
router.get('/isAdminauth',checkAdmin,isAdminAuth)









module.exports=router;