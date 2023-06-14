const ResortModel=require('../Model/ResorttModel')
const sendMail = require("../Service/approved");
module.exports.approveresort = async (req, res, next) => {
    try {
      let resortId = req.params.id;
      let approve = await ResortModel.findById(resortId).populate('resortowner');
      console.log(approve,"d")
      const newStatus = approve.verify === false ? true : false;
  
      if (newStatus) {
        // Resort is approved
        sendMail(
          approve.resortowner.email,
          "Innshot Approved",
          "Congrats! Your resort is approved.",
          true
        );
      } else {
        // Resort is rejected
        sendMail(
          approve.resortowner.email,
          "Innshot Rejected",
          "We regret to inform you that your resort is rejected.",
          false
        );
      }
  
      ResortModel.findOneAndUpdate({ _id: resortId }, { $set: { verify: newStatus } }).then((response) => {
        res.status(200).json({
            message:'Message Sented to resort owner email',
          success: true
        });
      });
    } catch (error) {
      res.json({ message: 'Error', success: false });
    }
  };
module.exports.getuniqueresortdata=async(req,res,next)=>{
    try {
        let resortId=req.params.id
        // console.log(resortId ,"resortid getting in admin  side")
        let resortdata=await ResortModel.findById(resortId).populate('resortowner')
        console.log(resortdata,"resortdata in unique page ....")
        res.status(200).json({resortdata,success:true})
        
    } catch (error) {
        console.log(error,"error while getting unique page loading...")
        res.json({message:'error while get unique page '})
        
    }
}
