const MessageModel=require('../Model/MessageModel')
module.exports.addMessage=async(req,res)=>{
    const {ChatId,senderId,text}=req.body 
    const message=new MessageModel({
     ChatId,senderId,text
    })
    console.log(message,"you are good")
    try {
        const result=await message.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
        
    }
}
module.exports.getMessage=async(req,res)=>{
    console.log(req.params.chatId,"chat id...")
    // const {ChatId}=req.params;
    try {

        const result=await MessageModel.find({ChatId: req.params.chatId})
        console.log(result,"getting message")
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
        
    }
}

module.exports.adMessage=async(req,res)=>{
    const {ChatId,senderId,text}=req.body 
    const message=new MessageModel({
     ChatId,senderId,text
    })
    console.log(message,"you are good")
    try {
        const result=await message.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
        
    }
}
module.exports.getMessag=async(req,res)=>{
    console.log(req.params.chatId,"chat id...")
    // const {ChatId}=req.params;
    try {

        const result=await MessageModel.find({ChatId: req.params.chatId})
        console.log(result,"getting message")
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
        
    }
}