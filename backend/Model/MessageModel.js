const mongoose=require('mongoose')
const MessageSchema=mongoose.Schema({
    ChatId:{
        type:String
    },
    senderId:{
        type:String
    },
    text:{
        type:String
    }

},{
    timestamps:true
})
module.exports=mongoose.model('Messages',MessageSchema)