const ResortModel=require('../Model/ResorttModel')
const AdvModal=require('../Model/AdventureModel')
const fs = require("fs");
const cloudinary = require('./config/cloudConfigure');
const AdventureModel = require('../Model/AdventureModel');
const { ObjectId } = require('mongodb');
const DestinationModel = require('../Model/DestinationModel');

module.exports.addresort=async(req,res,next)=>{
    try {
      console.log("bbbbjbjbjb")
   

        let files=Object.values(req.files).flatMap((val)=>val)

       let docpath=files.pop().path
      //  console.log(docpath,"docpath ....")
      //  files=files.slice(0,files.length-1)
       console.log(files,"file in cloudinary...")
        const promises=files.map(async(file)=>{
          const result=await cloudinary.uploader.upload(file.path,{
            format:'WebP',
            transformation:[{width:500,height:400}]
          })
          return result.secure_url
        })
       
        const imagess=await Promise.all(promises)
        const doccloud=await cloudinary.uploader.upload(docpath,{
          format:'pdf',

        })
      
        let imagePaths=[]
        console.log("erooooo")
        let id=  req.staffId
        console.log(id,"dfghj")
        
        let {resortname,place,number_room,address,description,price,phone}=req.body
        
        
        const staffresort= new ResortModel(
            {
                resortname,
                place,
                number_room,
                address,
                description,
                image:imagess,
                document:doccloud.secure_url,
                price,
                phone,
                resortowner:id,
               
            }
            )
        const savedResort = await staffresort.save()
        
        res.status(200).json({savedResort,message:'Resort Added successfully',created:true})
        // if(savedResort){
        //   console.log("success unlinking...")
        //   fs.unlinkSync(docpath)
        // }
        
    } catch (error) {
        console.log(error,"error in adding...")
      res.json({message:'errorwhile adding',created:false})
    
        
    }
 
}
module.exports.getResort = async (req, res, next) =>
 {
    try {
      let id=req.staffId
      // console.log(id,"id consoling.....")
      const resorts = await ResortModel.find({resortowner:id});
      console.log(resorts,"1111333")
      res.status(200).json({result:resorts,success:true});
      // actually we passing th eid means showing the owner added resort only 
    //   res.status(200).json({resorts,status:true,message:'success'});
      // console.log(resorts,"resorts data coming to ")
    } catch (error) {
      console.log(error,"error coming in getting")
      res.json({message:'error while listing the resorts',created:false})
    }
  };

  module.exports.posteditresort=async(req,res,next)=>{
    try {
      console.log(req.body,"request working.... properly....")
      
      console.log("possss")
      const files=Object.values(req.files).flatMap((val)=>val)
      // console.log(files,"file are coming....")
      let imagePaths=[]
      
        const  id  = req.params.id;
        for(let i=0;i<files.length-1;i++){
          imagePaths.push(files[i].path)

      }
      for (let i = 0; i < imagePaths.length; i++) {
        imagePaths[i] = imagePaths[i].replace('public', '');
        // console.log(imagePaths[i],"uuuuuuuuuuuuu")
      }
      let docpath=files[files.length-1].path
      let newdocpath = await docpath.replace('public','')
        console.log(newdocpath,"path of document  resorttt")
        // console.log(req.body,"id showing....")
        
        let {resortname,place,number_room,address,description,price,phone}=req.body
        // let {image,document}=req.files
        // let resortId=req.params.id
        // below code the first name is we already give in frontend that name it should be same
        const resort = await ResortModel.findByIdAndUpdate(
          { _id: id },
          {
            resortname: resortname,
            place: place,
            number_room: number_room,
            address: address,
            description: description,
            price: price,
            phone: phone,
            image: imagePaths,
            document: newdocpath,
          }
        );
        
        
        res.json({result:resort,message:'resort updated successfully',success:true})
        // console.log("edit resort page is working")
        // console.log(req.body,"yyyyyyyyyyyyyy")
    } catch (error) {
        console.log(error,"error")
    }
  }
  // module.exports.posteditresort = async (req, res, next) => {
  //   try {
  //     console.log("possss");
  //     const files = Object.values(req.files).flatMap((val) => val);
  //     console.log(files, "files are coming....");
  //     let imagePaths = [];
  
  //     const id = req.params.id;
  //     for (let i = 0; i < files.length - 1; i++) {
  //       imagePaths.push(files[i].path);
  //     }
  //     for (let i = 0; i < imagePaths.length; i++) {
  //       imagePaths[i] = imagePaths[i].replace('public', '');
  //     }
  //     let docpath = files[files.length - 1].path;
  //     let newdocpath = await docpath.replace('public', '');
  
  //     let {
  //       resortname,
  //       place,
  //       number_room,
  //       address,
  //       description,
  //       price,
  //       phone,
  //     } = req.body;
  
  //     const resort = await ResortModel.findByIdAndUpdate(
  //       id,
  //       {
  //         resortname,
  //         place,
  //         number_room,
  //         address,
  //         description,
  //         price,
  //         phone,
  //         image: imagePaths,
  //         document: newdocpath,
  //       },
  //       { new: true }
  //     );
  
  //     console.log(resort, "resort data fetched from the backend");
  //     res.json({ message: 'Resort updated successfully', success: true });
  //   } catch (error) {
  //     console.log(error, "error");
  //     res.status(500).json({ message: 'Internal Server Error', success: false });
  //   }
  // };
  
  
  module.exports.disableResort=async(req,res,next)=>{
    try {
        console.log(req.params.id,"params disable")
      let resortId=req.params.id
      // console.log(resortId,"resortid ")

        
     let disresort= await ResortModel.findById(resortId)
    //  console.log(disresort,"dddddddddddddd")
     const newstatus=disresort.status==='Enable' ? 'Disable' : 'Enable' 
   ResortModel.findOneAndUpdate({_id:resortId},{$set:{status:newstatus}}).then((response)=>{
    res.status(200).json({message:'disabled successfully',success:true})
   })
    //  return disresort
  // res.json({message:'resort Disabled',status:true,result:disresort})
          


        
        
    } catch (error) {
        res.json({message:'error while disabling....',success:false})
        
    }
  }
 
  module.exports.getallresortdata=async(req,res,next)=>{
    try {
   
      // console.log("get all resort admin page ")
      const resort=await ResortModel.find({status:'Enable'}).populate('resortowner')
      // console.log(resort,"resort data coming...")
      
      // resort.forEach(resortt => {
      //   console.log("Resort Owner Name:", resortt.resortowner);
      // });
      // const resortOwnerNames = resort.map(resort => resort.resortowner.name);
      // console.log("Resort Owner Names:", resortOwnerNames);
      res.status(200).json({resort,success:true})
      
    } catch (error) {
      // next(error)
      console.log(error)
      res.json({message:'error in get all resort data in admin side'})
      
    }

  }
  module.exports.addAdventure=async(req,res,next)=>{
    try {
      console.log(req.files,"ppppp")
      let id=req.staffId
      console.log(id,"staff ....")
      console.log(req.body,"iiiiiiiiii")
   const {adventureactivity,adventureprice,adventureTime,adventureplace,adventureresort,adventuredescription}=req.body

   
    const images=req.files
    const imagePaths = images.map(file => file.path.replace('public', ''));
  
    // let newimagePath=imagePaths.replace('public','')
    // const resort = await ResortModel.findOne({ resortname: adventureresort });
    // console.log(images,"hhhjhh")
    const Adventure=new AdvModal({
      activity:adventureactivity,
      place:adventureplace,
      description:adventuredescription,
      image:imagePaths,
      price:adventureprice,
      time:adventureTime,
      resortowner:id,
      resortName: adventureresort,
    })
    const newadv=await Adventure.save()
   
    console.log(newadv,"88888888888")
    res.status(200).json({newadv,message:'Adventure Added Success',created:true})


     
  
    } catch (error) {
      console.log(error,"eeeeeeeee")
      
    }
  }
  module.exports.getAdv=async(req,res)=>{
    try {
      let id=req.staffId 
      const objectId = new ObjectId(id);
      console.log(objectId,"object id...")
      const adventure=await AdventureModel.find({resortowner:objectId})
      
      console.log(adventure,"data in staff dashboard")
      res.status(200).json({result:adventure,success:true})
      
    } catch (error) {
      console.log(error,"66666666666")
      
    }
  }
  module.exports.posteditadv = async (req, res, next) => {
    try {
      const  id  = req.params.id;
      
      console.log("working....")
      // console.log(req.body)
      const {
        advact,
        advprc,
        advtime,
        advplace,
        advresort,
        advdescription
      } = req.body;
    
      
      console.log(advresort,"000000000456765")
  
      const images = req.files;
      const imagePaths = images.map(file => file.path);
  
      // const resort = await ResortModel.findOne({ resortname: advresort });
  
      const adventure = await AdvModal.findByIdAndUpdate({_id:id},{
      activity: advact,
      place: advplace,
      description:advdescription,
      image:imagePaths,
      price:advprc,
      time:advtime,
      resortName:advresort,

      }
        );
        console.log(adventure,"updated ....")
        res.json({result:adventure,message:'Adeventure Updated Successfully',success:true})
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  module.exports.addDestination=async(req,res)=>{
    try {
      let id=req.staffId
      console.log(id)
      console.log(req.files,"file of images...")
      // console.log(req.body,"formdata ")
      const {destname,destplace,destabout,destresort}=req.body
      console.log(req.body,"success")
      const images=req.files
      const imagePaths = images.map(file => file.path.replace('public', ''));
      console.log(imagePaths,"image completed....")
      const destination=new  DestinationModel({
        dest_name:destname,
        about:destabout,
        place:destplace,
        dest_img:imagePaths,
        // price:destprice,
        resortowner:id,
        resortName:destresort

      })
      const newdest=await destination.save()
      console.log(newdest,"new destination added...")
      res.status(200).json({newdest,message:'New Destination Added',created:true})
      
    } catch (error) {
      
    }
  }
  module.exports.getDestinationData=async(req,res)=>{
    try {
      let id=req.staffId
      
      console.log(id,"dvdv")
      const destination=await DestinationModel.find({resortowner:id})
      console.log(destination,"succvvvv")
      res.status(200).json({result:destination,success:true})

      
    } catch (error) {
      
    }
  }
  

