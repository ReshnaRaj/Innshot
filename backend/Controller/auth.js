const UserModel = require("../Model/UserModel");
const StaffModel=require('../Model/StaffModel')
const AdminModel=require('../Model/AdminModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const sendmail = require("../Service/mailservice");
const {verifyLink,verifystaffLink}=require('../Middleware/authuser')

const maxtime= 3*24*60*60
const createtoken=(id)=>{
    return jwt.sign({id},process.env.SECRET,{
        expiresIn:maxtime,
    })

}
const handleErrors=(err)=>{
    let errors={email:"",password:""}


if(err.code===11000){
    errors.email="This email is already registered"
    return errors
}
if(err.message.includes('users validation failed')){
    console.log(err.message,"error messageconsoling....")
    Object.values(err.errors).forEach(({properties})=>{
        errors[properties.path]=properties.message
    })
}return errors
}
module.exports.register=async(req,res,next)=>{
    try {
        const {name,email,phone,password}=req.body
        const user=await UserModel.create({name,email,phone,password})
      
        console.log(req.body)
        sendmail(email,'please Activate your account',`http://localhost:3000/verifyemail/${user._id}`)
        

        res.status(201).json({user,created:true})
        console.log(user,"user response going to front end")

    } catch (error) {
        console.log(error);
        const errors=handleErrors(error)
        res.json({errors,created:false})
        
    }
}
module.exports.login=async (req,res,next)=>{
   
    try {
        console.log("login page")
        const {email,password}=req.body;
        const user=await UserModel.findOne({email})

        if(user){
            if(user.verifiyd){
                // console.log("user verified working")
                const auth=await bcrypt.compare(password,user.password)
                if(auth){
                   const token=createtoken(user._id)
                   
            console.log(token,"tyuy")
              res
              .status(200)
              .json({ user,token,created: true });
            } else {
                const errors={password:"password is incorrect"}
                res.json({errors,created:false})
            }

            }
            else{
                const errors={email:"not verified"}
                res.json({errors})
            }
            
           
    }
    else {
        const errors = { email: "No user with the entered mail id" };
        res.json({ errors, created: false });
      }
    }
  catch (error) {
        
        console.log(error);
        const errors=handleErrors(error)
        res.json({errors,created:false})
    }

};
module.exports.verifyuser=async(req,res)=>{
    try {
        console.log("verify user is working...");
      const {id}=req.params;
        console.log(req.params,"rrrrr");
        const result=await verifyLink(id)
        if(!result) {
        throw new Error('cannot verify the user')
        }
        res.json({success:{status:true}})
        

    } catch (error) {
        res.json({error:error.message})
        
    }
}
module.exports.staffreg=async(req,res,next)=>{
    try {
        console.log("staff register page is working..");
        const {name,email,phone,password}=req.body
        const staffuser=await StaffModel.create({name,email,phone,password})
        sendmail(email,'please Activate your account As a resort owner',`http://localhost:3000/staff/verifystaffemail/${staffuser._id}`)
        console.log(staffuser,"staffff")
        res.status(201).json({staffuser,created:true})

    } catch (error) {
        console.log(error);
        const errors=handleErrors(error)
        res.json({errors,created:false})
        
    }
}
module.exports.stafflogin=async (req,res,next)=>{
   
    try {
        console.log("staff login page")
        const {email,password}=req.body;
        const staff=await StaffModel.findOne({email})

        if(staff){
            if(staff.verified){
                console.log("staff verified working")
                const auth=await bcrypt.compare(password,staff.password)
                console.log(auth,'authentication working')
                if(auth){
                    console.log(staff._id,"staff id")
                   const token=createtoken(staff._id)
                //    i getting doubt
                   
            
              res
              .status(200)
              .json({ staff,token,created: true });
            } else {
                const errors={password:"password is incorrect"}
                res.json({errors,created:false})
            }

            }
            else{
                const errors={email:"not verified"}
                res.json({errors})
            }
            
           
    }
    else {
        const errors = { email: "No user with the entered mail id" };
        res.json({ errors, created: false });
      }
    }
  catch (error) {
        
        console.log(error);
        const errors=handleErrors(error)
        res.json({errors,created:false})
    }

};
module.exports.verifystaff=async(req,res)=>{
    console.log("verify staff ")
    try {
        console.log("verify userstaff is working...");
      const {id}=req.params;
        console.log(req.params,"rrrdcfvgbhnjrr");
        const result=await verifystaffLink(id)
        console.log(result,"result of verify staff");
        if(!result) {
            
        throw new Error('cannot verify the user')
        }
        res.json({success:{status:true}})
        // res.json({result,status:true})
        

    } catch (error) {
        res.json({error:error.message})
        
    }
}
module.exports.adminlogin=async(req,res)=>{
    // console.log("admin login page working")
    try {
        const {email,password}=req.body
        const admin=await AdminModel.findOne({email})
        if(admin){
            const validatePassword=await bcrypt.compare(password,admin.password)
            if(validatePassword){
                const token=createtoken(admin._id)
                res.status(200).json({admin,token,created:true})
            }
            else{
                const errors={email:'Incorrect email or password'}
                res.json({errors,created:false})
            }
        }
        else{
            const errors={email:"No Admin with this mail id"}
            res.json({errors,created:false})
        }
        
    } catch (error) {
        const errors={email:'something gone wrong'}
        res.json({errors,created:false})
        
    }
}
