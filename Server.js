const express=require("express")
const app=express()
const bodyparser=require("body-parser")
const cors=require("cors")


app.use(bodyparser.json())
app.use(cors())


const UserController=require("./Conrtollers/Auth/SignupController")
const SigninController=require("./Conrtollers/Auth/SigninController")
const FriendsController=require("./Conrtollers/FriendController")
const Messagecontroller=require("./Conrtollers/MessageControlller")
const ConversatioController=require("./Conrtollers/Conversationcontroller")

app.use("/",UserController)
app.use("/",SigninController)
app.use("/",FriendsController)
app.use("/",Messagecontroller)
app.use("/",ConversatioController)


module.exports=app