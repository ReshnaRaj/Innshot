const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");
const Staff = require("../Model/StaffModel");
const Admin=require('../Model/AdminModel')
// module.exports.checkUser = (req, res, next) => {
//   const token = req.headers.authorization.split(" ")[1];
//   jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
//     if (err) {
//       res.json({ status: false });
//     } else {
//       const user = await User.findById({ _id: decodedToken.id });
//       if (user.verifiyd) {
//         res.json({ status: false });
//       } else {
//         req.user = user._id;
//         res.json({ status: false });
//         next();
//       }
//     }
//   });
// };
module.exports.checkUser=(req,res,next)=>{
  try {
    const token=req.headers.authorization?.split(' ')[1]
    if(!token){
      res.send({status:false,message:'failed  no token present'})
    }
    else{
      jwt.verify(token,process.env.SECRET,async(err,decodedToken)=>{
        if(err){
          console.log(err,"eeeeeeeee")
          res.json({status:false,message:'failes'})
        }
        else{
          const user=await User.findById({_id:decodedToken.id})
          req.user=user._id
          next()
        }
      })
    }
    
  } catch (error) {
    console.log(error,"error in ctch")
    
  }
}
module.exports.checkStaff = (req, res, next) => {
  
  try {
    const token=req.headers.authorization?.split(' ')[1]
    if(!token){
      res.send({status:false,message:'failed no token'})
    }
    else{
      jwt.verify(token, process.env.SECRET, async (err, decodedToken) =>{
        if(err){
          console.log(err)
          res.json({status:false,message:'failed at verifying'})
        }
        else{
          const staff = await Staff.findById({_id:decodedToken.id})
          req.staff=staff._id
          
          // req.staff =decoded.staff
          next();
        }

      })
    }
  } catch (error) {
    console.log(error,"eeeeeee")
  }

};
module.exports.checkAdmin=(req,res,next)=>{
  try {
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
      res.send({status:false,message:'you have no token'})
    }
    else{
      jwt.verify(token,process.env.SECRET,async(err,decodedToken)=>{
        if(err){
          res.json({status:false,message:'token no'})
        }
        else{
          const admin=await Admin.findById({_id:decodedToken._id})
          req.admin=admin._id
          next()
        }
      })
    }
    
  } catch (error) {
    console.log(error,"error innnn")
    
  }
}



module.exports.verifyLink = async (userId) => {
  try {
    console.log("user verify link working");
    let user = await User.findByIdAndUpdate(
      userId,
      { $set: { verifiyd: true } },
      { new: true }
    );
    return user;
  } catch (error) {
    // return null;
    console.log({status:true,message:'verifyed suucessfully'})
  }
};
module.exports.verifystaffLink = async (staffId) => {
  try {
    console.log("staff verify link working...");
    let staff = await Staff.findByIdAndUpdate(
      staffId,
      { $set: { verified: true } },
      { new: true }
    );
    console.log(staff, "testing");
    return staff;
  } catch (error) {
    console.log(error, "error erift link");
    // return null;
    
  }
};
