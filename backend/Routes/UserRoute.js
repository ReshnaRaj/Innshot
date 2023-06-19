const express = require('express')
const router = express.Router()
const {checkUser}=require('../Middleware/authuser')
const {register,login,verifyuser,isUserAuth}=require('../Controller/authController')
const {UserResort,getoneresort,getsimilarstay}=require('../Controller/UserController')
router.get('/')
router.post('/',verifyuser)
router.post('/register',register)
router.post('/login',login)
router.post('/verifyemail/:id',verifyuser)
router.get('/resortlist',UserResort)
router.get('/isUserAuth',checkUser,isUserAuth)
router.get('/oneresort/:id',getoneresort)
router.get('/getsimiliarstay/:data',getsimilarstay)





module.exports=router;
