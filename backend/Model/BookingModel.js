const mongoose=require('mongoose')
const bookingSchema=new mongoose.Schema({
    resortId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Resort'
    },
    // name:{
    //     type:String,
    //     required:true
    // },
    // email:{
    //     type:String,
    //     required:true

    // },
    // phone:{
    //     type:Number,
    //     required:true
    // },
    traveler:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    // total_amount:{
    //     type:Number,
    //     required:true
    // },
    fromDate:{
        type:String,
        required:true     
    },
    toDate:{
        type:String,
        required:true
    },
    // payment_method:{
    //     type:String,
    //     required:true
    // },
    transactionId:{
        type:String,
        // required:true
    },
    status:{
        type:String,
        required:true,
        default:'booked'
    },
},{
    timestamps:true
})
module.exports=mongoose.model('Booking',bookingSchema)