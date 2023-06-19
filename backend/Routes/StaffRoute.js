const express = require('express')
const router = express.Router()

const {staffreg,stafflogin,verifystaff,isStaffAuth}=require('../Controller/authController')
const { addresort,getResort,posteditresort,disableResort,addAdventure,getAdv} = require('../Controller/StaffController')
const {checkStaff}=require('../Middleware/authuser')
const {uploadImage}=require('../Middleware/Multer')


// const {upload}=require('../Middleware/fileupload')
router.post('/stafflogin',stafflogin)
router.post('/staffregister',staffreg)
router.post('/verifystaffemail/:id',verifystaff)
router.post('/add-resort',checkStaff,uploadImage.fields([{name:'image',maxCount:5},{name:'document',maxCount:1}]),addresort)
router.get('/getresortdata',checkStaff,getResort)


router.post('/posteditresort/:id',checkStaff,uploadImage.fields([{name:'image',maxCount:5},{name:'document',maxCount:1}]),posteditresort)
router.post('/disableresort/:id',checkStaff,disableResort);
router.get('/isStaffAuth',checkStaff,isStaffAuth)

router.post('/add-adv',checkStaff,uploadImage.array('adventureimage', 5),addAdventure);
router.get('/getadvdata',checkStaff,getAdv)





module.exports=router;