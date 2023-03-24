const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://admin:Chatbox@cluster0.vh1vhvd.mongodb.net/?retryWrites=true&w=majority").then(result=>{
    console.log("connected")
}).catch(err=>{
    console.log("error",err)
})