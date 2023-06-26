const AdventureModel = require('../Model/AdventureModel');
const ResortModel=require('../Model/ResorttModel')
const DestinationModel=require('../Model/DestinationModel')
module.exports.UserResort = async (req, res, next) =>
 {
    try {
        const resortt=await ResortModel.find({verify:true})
        // console.log(resort,"resort showing working.....")
        res.status(200).json({resortt,success:true})
     
    } catch (error) {
    console.log(error,"error consoling...")
      
    }
  };
  module.exports.getoneresort=async(req,res,next)=>{
    try {
      let resortId=req.params.id
      let oneresortdata=await ResortModel.findById(resortId).populate('resortowner')
      res.status(200).json({oneresortdata,success:true})
    } catch (error) {
      
      res.json({message:error.message})
    }
  }

  
module.exports.getsimilarstay=async(req,res,next)=>{
  try {
    const place = req.params.data;
    // console.log(place,"place is getting...")
    // const {excludedResortId} = req.body;
    // console.log(excludedResortId,"hhhhhhh")
    const similarStays = await ResortModel.find({
      verify:true,
      place,
      // _id: { $ne: excludedResortId },
    });
    // console.log(similarStays, "similar stays");
    res.json({ success: true, similarStays });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Failed to fetch similar stays' });
    
  }
}

module.exports.UserAdventure = async (req, res, next) =>
 {
    try {
        const adventure=await AdventureModel.find({verify:true})
        // console.log(resort,"resort showing working.....")
        res.status(200).json({adventure,success:true})
     
    } catch (error) {
    console.log(error,"error consoling...")
      
    }
  };
  module.exports.getoneAdv=async(req,res)=>{
    try {
      console.log("getting...")
      let advId=req.params.id
      let oneadvdata=await AdventureModel.findById(advId).populate('resortowner')
      res.status(200).json({oneadvdata,success:true})
    } catch (error) {
      
    }
  }
  module.exports.UserDestinations = async (req, res, next) =>
 {
    try {
        const destination=await DestinationModel.find({verify:true})
        // console.log(resort,"resort showing working.....")
        res.status(200).json({destination,success:true})
     
    } catch (error) {
    console.log(error,"error consoling...")
      
    }
  };
  module.exports.getonedest=async(req,res)=>{
    console.log("one destination data")
    try {
      console.log("getting...")
      let destId=req.params.id
      let onedestdata=await DestinationModel.findById(destId).populate('resortowner')
      res.status(200).json({onedestdata,success:true})
    } catch (error) {
      
    }
  }
  



