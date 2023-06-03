const express = require('express')
const router = express.Router()
const {adminlogin}=require('../Controller/auth')
router.post('/adlogin',adminlogin)








module.exports=router;