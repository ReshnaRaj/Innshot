const express=require('express')
const app=express();
require('dotenv').config()
const cors=require('cors')
const path = require('path');
// const http = require("http");
const dbConnection=require('./Connection/database')
const cookieParser=require('cookie-parser')
// const bodyparser=require('body-parser')
const userouter=require('./Routes/UserRoute')
const staffrouter=require('./Routes/StaffRoute')
const adminrouter=require('./Routes/AdminRoute')
dbConnection();
app.use('/', express.static(path.join(__dirname, 'public')))  

app.use(cors({
    origin:[process.env.BASE_URL],
    method:['GET','POST','DELETE','PUT'],
    credentials:true
})
)
app.use(cookieParser())
// app.use(bodyparser.json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',userouter)
app.use('/staff',staffrouter)
app.use('/admin',adminrouter)

app.listen(4001,()=>{
    console.log("server started at port 4001")
})
