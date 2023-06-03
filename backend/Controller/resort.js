// const StaffModel=require('../Model/StaffModel')

const ResortModel=require('../Model/ResorttModel')
module.exports.addresort=async(req,res,next)=>{
    try {
        console.log(req.files,'files incoming')
        const files=Object.values(req.files).flatMap((val)=>val)
        console.log("add resort page working",files)
        let  {path} = files[0]
        let docpath=files[1].path

        let {resortname,place,number_room,address,description,price,phone}=req.body
        console.log(resortname,"hello");
        console.log(path,docpath,"filename name")
        const staffresort= new ResortModel(
            {
                resortname,
                place,
                number_room,
                address,
                description,
                image:path,
                document:docpath,
                price,
                phone
            }
            )
        const savedResort = await staffresort.save()
        res.status(200).json({savedResort,created:true})
        
    } catch (error) {
        next(error)
        
    }
 
}

