const  mongoose=require('mongoose')
const adventureSchema=new mongoose.Schema({
    resortName:{
        // type:mongoose.Schema.Types.ObjectId,
        type:String,
        require:true,
        ref:'Resort'
    },
    resortowner:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "Staff"
      },
    activity:{
        type:String,
        required:[true,'adventure name is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    place:{
        type:String
    },
    image:{
        type:Object,
        required:[true]
    },
    price:{
        type:Number,
        required:[true]
    },
    time:{
        type:Number,
        required:[true]
    },
    
})
module.exports=mongoose.model('Adventure',adventureSchema)