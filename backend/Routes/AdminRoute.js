const express = require('express')
const router = express.Router()
const {adminlogin}=require('../Controller/auth')
const {getallresortdata}=require('../Controller/resort')
const {approveresort,getuniqueresortdata}=require('../Controller/admincontroller')
const {checkAdmin}=require('../Middleware/authuser')
router.post('/adlogin',adminlogin)
router.get('/getallresortdata',getallresortdata)
router.get('/getuniqueresort/:id',getuniqueresortdata)
router.post('/approveresort/:id',approveresort)









module.exports=router;