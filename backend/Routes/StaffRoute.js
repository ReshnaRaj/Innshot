const express = require('express')
const router = express.Router()

const {staffreg,stafflogin, verifystaff}=require('../Controller/auth')
const { addresort, getResort,posteditresort,disableResort } = require('../Controller/resort')
const {checkStaff}=require('../Middleware/authuser')
const uploadImage=require('../Middleware/Multer')
// const {upload}=require('../Middleware/fileupload')
router.post('/stafflogin',stafflogin)
router.post('/staffregister',staffreg)
router.post('/verifystaffemail/:id',verifystaff)
router.post('/add-resort',checkStaff,uploadImage.fields([{name:'image',maxCount:5},{name:'document',maxCount:1}]),addresort)
router.get('/getresortdata',checkStaff,getResort)

router.post('/posteditresort/:id',checkStaff,uploadImage.fields([{name:'image',maxCount:5},{name:'document',maxCount:1}]),posteditresort)
router.post('/disableresort/:id',checkStaff,disableResort);





module.exports=router;