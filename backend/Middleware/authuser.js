const jwt=require('jsonwebtoken')
const User=require('../Model/UserModel')
const Staff=require('../Model/StaffModel')
module.exports.checkUser=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,'secret key', async (err,decodedToken)=>{
            if(err){
                res.json({status:false})
            }
            else{
                const user=await User.findById({_id:decodedToken.id})
                if(user){
                    next();
                }
                else{
                    res.json({status:false})
                }
            }
        })
    }
    else{
        res.json({status:false})
    }
}
module.exports.verifyLink = async (userId) => {
    try {
        console.log("user verify link working");
      let user = await User.findByIdAndUpdate(userId, { $set: { verifiyd: true } }, { new: true });
      return user;
    } catch (error) {
      return null;
    }
  };
  module.exports.verifystaffLink = async (staffId) => {
    try {
        console.log("staff verify link working...");
      let staff = await Staff.findByIdAndUpdate(staffId, { $set: { verified: true } }, { new: true });
      console.log(staff,"testing")
      return staff;
    } catch (error) {
      console.log(error,"error erift link")
      return null;
    }
  };