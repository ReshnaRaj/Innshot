const express = require('express')
const router = express.Router()
const {checkUser}=require('../Middleware/authuser')
const {register,login,verifyuser,isUserAuth}=require('../Controller/authController')
const {UserResort,getoneresort,getsimilarstay,UserAdventure,UserDestinations,getoneAdv,getonedest,getbookeddata,resort_book, verifyPayment}=require('../Controller/UserController')
router.get('/')
router.post('/',verifyuser)
router.post('/register',register)
router.post('/login',login)
router.post('/verifyemail/:id',verifyuser)
router.get('/resortlist',UserResort)
router.get('/isUserAuth',checkUser,isUserAuth)
router.get('/oneresort/:id',getoneresort)
router.get('/getsimiliarstay/:data',getsimilarstay)
router.get('/adventurelist',UserAdventure)
router.get('/destinations',UserDestinations)
router.get('/oneadv/:id',getoneAdv)
router.get('/onedest/:id',getonedest)
// router.post('/booking',checkUser,resort_booking)
router.post('/bookedresort',checkUser,resort_book)
router.post('/verifypayment',checkUser,verifyPayment)
router.get('/getbookeddata',checkUser,getbookeddata)




module.exports=router;
