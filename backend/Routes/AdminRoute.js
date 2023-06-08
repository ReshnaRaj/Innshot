const express = require('express')
const router = express.Router()
const {adminlogin}=require('../Controller/auth')
const {getallresortdata}=require('../Controller/resort')
const {approveresort}=require('../Controller/admincontroller')
const {checkAdmin}=require('../Middleware/authuser')
router.post('/adlogin',adminlogin)
router.get('/getallresortdata',getallresortdata)
router.post('/approveresort',approveresort)









module.exports=router;