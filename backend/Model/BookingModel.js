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
    Booked_at:{
        type:Date,
        
    },
    payment:{
        payment_method:{type:String},
        payment_id:{type:String},
        payment_order_id:{type:String},
        payment_status:{type:String, default:'pending'},
    },
    // transactionId:{
    //     type:String,
    //     // required:true
    // },
    status:{
        type:String,
        required:true,
        default:'booked'
    },
})
module.exports=mongoose.model('Booking',bookingSchema)