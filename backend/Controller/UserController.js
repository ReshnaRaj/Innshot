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
  


