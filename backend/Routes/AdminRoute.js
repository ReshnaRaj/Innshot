const express = require('express')
const router = express.Router()
const {adminlogin,isAdminAuth}=require('../Controller/authController')
const {getallresortdata}=require('../Controller/StaffController')
const {approveresort,getuniqueresortdata,getalladvdata,getuniqadvdata,approveAdvent,getalldestdata,getuniquedest}=require('../Controller/adminController')
const {checkAdmin}=require('../Middleware/authuser')
router.post('/adlogin',adminlogin)
router.get('/getallresortdata',getallresortdata)
router.get('/getuniqueresort/:id',getuniqueresortdata)
router.post('/approveresort/:id',approveresort)
router.get('/isAdminauth',checkAdmin,isAdminAuth)
router.get('/getalladvdata',checkAdmin,getalladvdata)
router.get('/getuniqadv/:id',checkAdmin,getuniqadvdata)
router.post('/approveadvent/:id',checkAdmin,approveAdvent)
router.get('/getalldestdata',checkAdmin,getalldestdata)
router.get('/getuniqdest/:id',checkAdmin,getuniquedest)









module.exports=router;