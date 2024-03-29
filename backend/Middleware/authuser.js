const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");
const Staff = require("../Model/StaffModel");
const Admin = require("../Model/AdminModel");
const StaffModel = require("../Model/StaffModel");
 
module.exports.checkUser = (req, res, next) => {
  try {
 
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token,"checkuser token function")
    if (!token) {
      res.send({ status: false, message: "failed  no token present" });
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        console.log(decodedToken,"token getting....")
        if (err) {
          
          res.json({ status: false, message: "failes" });
        } else {

          req.userId = decodedToken.userId;
          if(decodedToken.role=='user'){
          
          next();
          }
          else{
            res.json({ message:"Role not verified"})
          }
        }
      });
    }
  } catch (error) {
    console.log(error, "error in ctch");
  }
};
module.exports.checkStaff = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.send({ status: false, message: "failed no token" });
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decodedToken) => {
        if (err) {
          console.log(err);
          res.json({ status: false, message: "failed at verifying" });
        } else {
          req.staffId = decodedToken.staffId;
          if(decodedToken.role=='staff'){
          
            next();
            }
            else{
              res.json({ message:"Role not verified"})
            }
 
         
        }
      });
    }
  } catch (error) {
    console.log(error, "eeeeeee");
  }
};
module.exports.checkAdmin = (req, res, next) => {
  try {
 
    if (req.headers.authorization) {
      const token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) {
          res.json({ status: false, message: "token expired" });
        } else {
          req.adminId = decodedToken.adminId;
          if(decodedToken.role=='admin'){
          
            next();
            }
            else{
              res.json({ message:"Role not verified"})
            }
        }
      });
    } else res.json({ status: false, message: "didn't get token" });
  } catch (error) {
    res.json({ status: false, message: "something went wrong" });
  }
};
 

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
    // return null
    console.log({ status: true, message: "verifyed suucessfully" });
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
