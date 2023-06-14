const ResortModel=require('../Model/ResorttModel')
const fs = require("fs");
const cloudinary = require('../Controller/config/cloudConfigure')
module.exports.addresort=async(req,res,next)=>{
    try {
      console.log("bbbbjbjbjb")
      // console.log(req.body,"request body working...")
      // console.log(req.files,"files are displaying..")
      // console.log(req.staff,"staff are displaying..")
         // Extracting files from the request

        let files=Object.values(req.files).flatMap((val)=>val)

       let docpath=files.pop().path
      //  console.log(docpath,"docpath ....")
      //  files=files.slice(0,files.length-1)
       console.log(files,"file in cloudinary...")
        const promises=files.map(async(file)=>{
          const result=await cloudinary.uploader.upload(file.path,{
            format:'WebP',
            transformation:[{width:200,height:100}]
          })
          return result.secure_url
        })
       
        const imagess=await Promise.all(promises)
        const doccloud=await cloudinary.uploader.upload(docpath,{
          format:'pdf',

        })
      
        let imagePaths=[]
        console.log("erooooo")
        let id=req.staff
        // console.log(id,"id display...")
         // Looping through files (except the last one) to get their paths
        // for(let i=0;i<imagess.length-1;i++){
        //     imagePaths.push(files[i].path)

        // }
        // for (let i = 0; i < imagess.length; i++) {
        //   imagePaths[i] = imagePaths[i].replace('public', '');
        //   // console.log(imagePaths[i],"uuuuuuuuuuuuu")
        // }
        
        // Getting the path of the last file (document)
        
      // console.log(docpath,"uuuuuuuuuuuuuuuu")

        // let newdocpath = await docpath.replace('public','')
        // console.log(newdocpath,"hhhhhhhhhhhhhhh")
        
         // Extracting data from the request body
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
                resortowner:id
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
      let id=req.staff
      // console.log(id,"id consoling.....")
      const resorts = await ResortModel.find({resortowner:id});
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

