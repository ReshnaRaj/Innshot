const express = require('express')
const router = express.Router()
const {checkUser}=require('../Middleware/authuser')
const {register,login,verifyuser,isUserAuth}=require('../Controller/authController')
const {UserResort,getoneresort,getsimilarstay,UserAdventure,UserDestinations,getoneAdv,getonedest}=require('../Controller/UserController')
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





module.exports=router;
