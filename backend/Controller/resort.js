

const ResortModel=require('../Model/ResorttModel')
module.exports.addresort=async(req,res,next)=>{
    try {
         // Extracting files from the request
        const files=Object.values(req.files).flatMap((val)=>val)
        let imagePaths=[]
        let id=req.staff
         // Looping through files (except the last one) to get their paths
        for(let i=0;i<files.length-1;i++){
            imagePaths.push(files[i].path)

        }
        for (let i = 0; i < imagePaths.length; i++) {
          imagePaths[i] = imagePaths[i].replace('public', '');
          // console.log(imagePaths[i],"uuuuuuuuuuuuu")
        }
        
        // Getting the path of the last file (document)
        let docpath=files[files.length-1].path
      // console.log(docpath,"uuuuuuuuuuuuuuuu")

        let newdocpath = await docpath.replace('public','')
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
                image:imagePaths,
                document:newdocpath,
                price,
                phone,
                resortowner:id
            }
            )
        const savedResort = await staffresort.save()
        res.status(200).json({savedResort,message:'Resort Added successfully',created:true})
        
    } catch (error) {
        next(error)
        
    }
 
}
module.exports.getResort = async (req, res, next) =>
 {
    try {
      let id=req.staff
      const resorts = await ResortModel.find({resortowner:id});
      res.status(200).json(resorts);
    //   res.status(200).json({resorts,status:true,message:'success'});
      // console.log(resorts,"resorts data coming to ")
    } catch (error) {
      next(error);
    }
  };


  // module.exports.posteditresort=async(req,res,next)=>{
  //   try {
  //     console.log("possss")
  //       const  id  = req.params.id;
  //       // console.log(id,"resort id")
  //       // console.log(req.body,"id showing....")
        
  //       let {resortname,place,number_room,address,description,price,phone}=req.body
  //       // let resortId=req.params.id
  //       const resort=await ResortModel.findByIdAndUpdate({_id:id},{resortname:resortname,place:place,number_room:number_room,address:address,description:description,price:price,phone:phone})
  //       console.log(resort,"resort data fetching from backend")
  //       res.json({message:'resort updated successfully',success:true})
  //       // console.log("edit resort page is working")
  //       // console.log(req.body,"yyyyyyyyyyyyyy")
  //   } catch (error) {
  //       console.log(error,"error")
  //   }
  // }
  // module.exports.disableResort=async(req,res,next)=>{
  //   try {
  //       console.log("delete resort  start")
  //     let resortId=req.params.id
  //     console.log(resortId,"resortid ")

        
  //    let disresort= await ResortModel.findByIdAndUpdate({_id:resortId},{$set:{status:true}})
  //    console.log(disresort,"dissssss")
  //   //  return disresort
  //           res.json({message:'resort Disabled',status:true,result:disresort})
          


        
        
  //   } catch (error) {
  //       res.json({message:'error',success:false})
        
  //   }
  // }
 module.exports.posteditresort = async (req, res, next) => {
  try {
    console.log(req.files,"file are displaying....")
    console.log("post edit working...")
    const id = req.params.id;
    let { resortname, place, number_room, address, description, price, phone } = req.body;

    // Handle image updates if any
    if (req.files && req.files.image) {
      const files = Object.values(req.files.image).flatMap((val) => val);
      let imagePaths = [];

      for (let i = 0; i < files.length; i++) {
        imagePaths.push(files[i].path);
        console.log(imagePaths,"ppppp")
      }

      // Update the resort with new image paths
      await ResortModel.findByIdAndUpdate({ _id: id }, { $push: { image: imagePaths } });
    }

    // Handle file (document) update if any
    if (req.files && req.files.document) {
      const document = req.files.document;
      const docpath = document.path;
      console.log(docpath,"docpath showing....")

      // Update the resort with new document path
      await ResortModel.findByIdAndUpdate({ _id: id }, { document: docpath });
    }

    // Update the other resort data
    await ResortModel.findByIdAndUpdate(
      { _id: id },
      {
        resortname,
        place,
        number_room,
        address,
        description,
        price,
        phone,
      }
    );

    res.json({ message: 'Resort updated successfully', success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
  module.exports.disableResort=async(req,res,next)=>{
    try {
        // console.log("delete resort  start")
      let resortId=req.params.id
      // console.log(resortId,"resortid ")

        
     let disresort= await ResortModel.findById(resortId)
     console.log(disresort,"dddddddddddddd")
     const newstatus=disresort.status==='Enable' ? 'Disable' : 'Enable' 
   ResortModel.findOneAndUpdate({_id:resortId},{$set:{status:newstatus}}).then((response)=>{
    res.status(200).json({message:'disabled successfully',success:true})
   })
    //  return disresort
  // res.json({message:'resort Disabled',status:true,result:disresort})
          


        
        
    } catch (error) {
        res.json({message:'error',success:false})
        
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
      res.status(200).json(resort)
      
    } catch (error) {
      // next(error)
      console.log(error)
      
    }

  }

