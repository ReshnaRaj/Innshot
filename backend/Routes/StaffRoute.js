const express = require('express')
const router = express.Router()

const {staffreg,stafflogin,verifystaff,isStaffAuth}=require('../Controller/authController')
const { addresort,getResort,posteditresort,disableResort,addAdventure,getAdv,posteditadv,addDestination,getDestinationData,editdestination,getbookedresort,getStaf} = require('../Controller/StaffController')
const {checkStaff}=require('../Middleware/authuser')
const {uploadImage}=require('../Middleware/Multer')
const {StaffChats,findstaffchat}=require('../Controller/ChatController')
const {adMessage,getMessag}=require('../Controller/MessageController')

 
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
router.post('/posteditadv/:id',checkStaff,uploadImage.array('adventureimage',5),posteditadv)

router.post('/add-dest',checkStaff,uploadImage.array('destimages',5),addDestination)
router.get('/getdestdata',checkStaff,getDestinationData)
router.post('/posteditdest/:id',checkStaff,uploadImage.array('destimages',5),editdestination)

router.get('/getbookedresortdata',checkStaff,getbookedresort)
// staff chatting working..
router.get('/getstaffchat/:staffId',checkStaff,StaffChats)
router.get('/getuserchats/find/:fisrtId/:secondId',checkStaff,findstaffchat)

router.post('/admsg',checkStaff,adMessage)
router.get('/getstaffmsg/:chatId',checkStaff,getMessag)
router.get('/getuserdata/:id',checkStaff,getStaf)





module.exports=router;