const ResortModel=require('../Model/ResorttModel')
module.exports.UserResort = async (req, res, next) =>
 {
    try {
        const resort=await ResortModel.find({verify:true})
        console.log(resort,"resort showing working.....")
        res.status(200).json({resort,success:true})
     
    } catch (error) {
    console.log(error,"error consoling...")
      
    }
  };


