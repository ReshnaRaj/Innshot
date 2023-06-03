const express = require('express')
const router = express.Router()

const {staffreg,stafflogin, verifystaff}=require('../Controller/auth')
const { addresort } = require('../Controller/resort')
const uploadImage=require('../Middleware/Multer')
const {upload}=require('../Middleware/fileupload')
router.post('/stafflogin',stafflogin)
router.post('/staffregister',staffreg)
router.post('/verifystaffemail/:id',verifystaff)
router.post('/add-resort',uploadImage.fields([{name:'image',maxCount:5},{name:'document',maxCount:1}]),addresort)





module.exports=router;