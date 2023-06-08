const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");
const Staff = require("../Model/StaffModel");
const Admin=require('../Model/AdminModel')
module.exports.checkUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
    if (err) {
      res.json({ status: false });
    } else {
      const user = await User.findById({ _id: decodedToken.id });
      if (user.verifiyd) {
        res.json({ status: false });
      } else {
        req.user = user._id;
        res.json({ status: false });
        next();
      }
    }
  });
};
module.exports.checkStaff = (req, res, next) => {
  
  // console.log("checkstaff page")
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {

    if (err) {
      console.log(err,"errrorrr")
      res.json({ status: false });

    } else {
      const staff = await Staff.findById({_id:decodedToken.id})
      // console.log(staff,"staff datas ")
      if (staff.blocked) {
        res.json({status:false,message:'you are bloacked by admin'})
      } else {
        req.staff=staff._id
        next()
      }
    }
  });
};

module.exports.CheckAdmin = (req,res,next) =>{
   
  const token = req.headers.authorization.split(' ')[1];
   
  
  jwt.verify(token,process.env.SECRET,async (err,decodedToken)=>{
    if(err){
      console.log(err);
      res.json({ status: false})
    }else{
      const admin = await Admin.findById({_id:decodedToken._id})
      
      if(admin){
        next()
      }
    }
  })
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
    return null;
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
    return null;
  }
};
