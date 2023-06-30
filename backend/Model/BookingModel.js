const mongoose=require('mongoose')
const bookingSchema=new mongoose.Schema({
    resortId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Resort'
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    phone:{
        type:Number,
        required:true
    },
    traveler:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    total_amount:{
        type:Number,
        required:true
    },
   

})
module.exports=mongoose.model('Booking',bookingSchema)