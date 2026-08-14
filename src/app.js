const express = require("express");
const app = express();

const {connectDB} = require("./config/database")
const User = require("./models/user")

app.post("/signup",async (req,res)=>{
  const userObj = {
    firstName : "Sachin",
    lastNamee : "Tendulakar",
    email : "sachin33@gmail.com",
    password : "Virat@123",
    _id : "22876546678"
  }
  
  // Creating a  new instance of new user model
  const user  = new User(userObj)

  try{
    await user.save();
    res.send("User added successfully")
  }catch(err){
    res.status(400).send("Error saving the user :"  + err.message)
  }
})

connectDB()
   .then(()=>{
    console.log("Database connection established")
  app.listen(3000, () => {
  console.log("Server is succesfully running on port 3000");
});
}).catch((err)=>{
  console.error("Database can't be connected"+err.message)
})

