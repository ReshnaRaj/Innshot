const  mongoose=require('mongoose')
const adventureSchema=new mongoose.Schema({
    adventurename:{
        type:String,
        required:[true,'adventure name is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    image:{
        type:Object,
        required:[true]
    },
    price:{
        type:Number,
        required:[true]
    }
})
module.exports=mongoose.model('Adventures',adventureSchema)