const ResortModel=require('../Model/ResorttModel')
module.exports.approveresort=async(req,res,next)=>{
    try {
        let resortId=req.params.id
        let approve=await ResortModel.findById(resortId)
        console.log(resortId,"approve button......");
        const newstatus=approve.verify==='false' ? 'true' :'false'
        ResortModel.findOneAndUpdate({_id:resortId},{$set:{verify:newstatus}}).then((response)=>{
            res.status(200).json({
                message:'approved suuceessfully',success:true
        })


        
    }) 
}catch (error) {
        res.json({message:'error',success:false})
        
    }

}
