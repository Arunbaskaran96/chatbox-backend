const mongoose=require("mongoose")


const ConversationModel=mongoose.Schema({
    members:{
        type:Array
    }
})

module.exports=mongoose.model("conversation",ConversationModel)