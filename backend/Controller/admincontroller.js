const AdventureModel = require('../Model/AdventureModel');
const DestinationModel = require('../Model/DestinationModel');
const ResortModel=require('../Model/ResorttModel')
const StaffModel=require('../Model/StaffModel')
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
module.exports.getalladvdata=async(req,res,next)=>{
  try {
    const adventureactivity=await AdventureModel.find({}).populate('resortowner')
    res.status(200).json({adventureactivity,success:true})
    
  } catch (error) {
    console.log(error)
    
  }
}
module.exports.getuniqadvdata=async(req,res)=>{
  try {
    let advId=req.params.id
    let adventuredata=await AdventureModel.findById(advId).populate('resortowner')
    console.log(adventuredata,"data od adventure..")
    res.status(200).json({adventuredata,success:true})
  } catch (error) {
    
  }
}

module.exports.approveAdvent = async (req, res, next) => {
  try {
    let adventId = req.params.id;
    let approve = await AdventureModel.findById(adventId).populate('resortowner');
    console.log(approve, "d");
    const newStatus = approve.verify === false ? true : false;
    
    let message = newStatus ? 'Resort approved' : 'Resort rejected';
    AdventureModel.findOneAndUpdate({ _id: adventId }, { $set: { verify: newStatus } }).then((response) => {
     
      res.status(200).json({
        message: message,
        success: true
      });
    });
  } catch (error) {
    res.json({ message: 'Error', success: false });
  }
};

module.exports.getalldestdata=async(req,res,next)=>{
  try {
    const destination=await DestinationModel.find({}).populate('resortowner')
    // console.log(destination,"aaaaaaaaaaa")
    res.status(200).json({destination,success:true})
    
  } catch (error) {
    console.log(error)
    
  }
}
module.exports.getuniquedest=async(req,res)=>{
  try {
    let destId=req.params.id
    let destdata=await DestinationModel.findById(destId).populate('resortowner')
    console.log(destdata,"data od destination..")
    res.status(200).json({destdata,success:true})
  } catch (error) {
    
  }
}
module.exports.approveDestination=async(req,res)=>{
  try {
    // console.log("working....")
    let destId=req.params.id
    // console.log(destId,"destination id")
    let destination=await DestinationModel.findById(destId).populate('resortowner')
    // console.log(destination,"data.....")
    const new_status=destination.verify===false ? true : false;
    console.log(new_status,"updated...")
    let message=new_status ? 'Resort Approved' : 'Resort Rejeceted';
    DestinationModel.findOneAndUpdate({_id:destId},{$set:{verify:new_status}}).then((response)=>{
      res.status(200).json({message:message,success:true})
    })
   
  } catch (error) {
    res.json({message:'Error',success:false})
    
  }
}
// Assuming you have imported the necessary dependencies and staffModel

module.exports.getAllstaffData = async (req, res) => {
  try {
    const staffs = await StaffModel.find({verified:true});
    console.log(staffs,"all staff displaying...")
    res.status(200).json({staffs,success:true})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.blockStaff=async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
}