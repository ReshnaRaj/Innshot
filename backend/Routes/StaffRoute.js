const express = require('express')
const router = express.Router()

const {staffreg,stafflogin,verifystaff,isStaffAuth}=require('../Controller/authController')
const { addresort,getResort,posteditresort,disableResort,addAdventure,getAdv,posteditadv,addDestination,getDestinationData,editdestination,getbookedresort,getStaf} = require('../Controller/StaffController')
const {checkStaff}=require('../Middleware/authuser')
const {uploadImage}=require('../Middleware/Multer')
const {StaffChats,findstaffchat}=require('../Controller/ChatController')
const {adMessage,getMessag}=require('../Controller/MessageController')

 
router.post('/staffLogin',stafflogin)
router.post('/staffRegister',staffreg)
router.post('/verifyStaffEmail/:id',verifystaff)
router.post('/add-resort',checkStaff,uploadImage.fields([{name:'image',maxCount:5},{name:'document',maxCount:1}]),addresort)
router.get('/getResortData',checkStaff,getResort)


router.post('/postEditResort/:id',checkStaff,uploadImage.fields([{name:'image',maxCount:5},{name:'document',maxCount:1}]),posteditresort)
router.post('/disableResort/:id',checkStaff,disableResort);
router.get('/isStaffAuth',checkStaff,isStaffAuth)

router.post('/add-adv',checkStaff,uploadImage.array('adventureimage', 5),addAdventure);
router.get('/getAdvData',checkStaff,getAdv)
router.post('/postEditAdv/:id',checkStaff,uploadImage.array('adventureimage',5),posteditadv)

router.post('/add-dest',checkStaff,uploadImage.array('destimages',5),addDestination)
router.get('/getDestData',checkStaff,getDestinationData)
router.post('/postEditdest/:id',checkStaff,uploadImage.array('destimages',5),editdestination)

router.get('/getBookedResortdata',checkStaff,getbookedresort)
// staff chatting working..
router.get('/getStaffchat/:staffId',checkStaff,StaffChats)
router.get('/getUserchats/find/:fisrtId/:secondId',checkStaff,findstaffchat)

router.post('/adMsg',checkStaff,adMessage)
router.get('/getStaffMsg/:chatId',checkStaff,getMessag)
router.get('/getUserData/:id',checkStaff,getStaf)





module.exports=router;