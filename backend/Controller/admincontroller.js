const ResortModel=require('../Model/ResorttModel')
module.exports.approveresort=async(req,res,next)=>{
    try {
        let resortId=req.params.resortId
        let approve=await ResortModel.findById(resortId)
        console.log(resortId,"approve button......");

        
    } catch (error) {
        
    }
}