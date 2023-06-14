const express = require('express')
const router = express.Router()
const {checkUser}=require('../Middleware/authuser')
const {register,login,verifyuser}=require('../Controller/auth')
const {UserResort}=require('../Controller/user')
router.get('/')
router.post('/',verifyuser)
router.post('/register',register)
router.post('/login',login)
router.post('/verifyemail/:id',verifyuser)
router.get('/resortlist',UserResort)






module.exports=router;
