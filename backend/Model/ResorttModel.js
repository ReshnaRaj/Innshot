const mongoose=require('mongoose')
const resortSchema=new mongoose.Schema({
    
    resortowner:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "Staff"
      },
    resortname:{
        type:String,
        required:[true,'resort name is required']
    },
    place:{
        type:String,
        required:[true,"location is specified"]
    },
    number_room:{
        type:Number,
    //     required:[true,"required"]
     },
    address:{
        type:String,
        required:[true]
    },
  
    description:{
        type:String,
        required:[true,'description is required']
    },
   
    image:{
        type:[String],
        required:[true,'image is required']

    },
    document:{
        type:String,
        required:[true,'certificate is needed']
    },
     price:{
        type:Number,
        required:[true,'price is required']
    },
    verify:{
        type:Boolean,
        default:false
    },
    phone:{
        type:Number
    },
    status:{
        type:String,
        default:'Enable',   
    },
    service:{
        type:[String],
        required: [true, 'services are required'],

    }
   

}) 

module.exports=mongoose.model('Resort',resortSchema)
