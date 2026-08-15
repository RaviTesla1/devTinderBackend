const express = require("express");
const app = express();

const {connectDB} = require("./config/database")
const User = require("./models/user")

app.use(express.json())

app.post("/signup",async (req,res)=>{
  console.log("user------",req.body)
  // Creating a  new instance of new user model
  const user  = new User(req.body)

  try{
    await user.save();
    res.send("User added successfully")
  }catch(err){
    res.status(400).send("Error saving the user :"  + err.message)
  }
})
// Get user by email
app.get("/user",async (req,res) =>{
  console.log("Email =======>>>>>",req.body.email)
  const email = req.body.email;

   try{
    const users = await User.findOne({email:email });

    if(!users){
      res.status(404).send("User not found")
    }else res.send(users)
  }catch(err){
    res.status(400).send("User not found :"  + err.message)
  }

})
// Feed Api - GET / feed - get all the users from the database
app.get("/feed",async(req,res) =>{
  try {
    const users = await User.find({});
    res.send(users)
  }catch(err){
    res.status(400).send("Something went wrong")
  }

})

app.delete("/user", async (req,res)=>{
  console.log("user ======>>>>>",req.body.userId)
  const userId = await req.body.userId;
  try{
    // await User.findByIdAndDelete(userId)
    await User.findByIdAndDelete({_id:userId})
    res.send("User deleted successfully")
  }catch(err){
    res.status(400).send("Something went wrong")
  }
})

// USER UPDATE :
app.patch("/user", async (req, res) =>{
  const userId =  req.body.userId;
  const data =  req.body;
/*   console.log("userId=====>",userId)
  console.log("req.body.data ======>>>>",req.body) */

  try{
    const user = await User.findByIdAndUpdate(userId, data,{
      returnDocument :"after",
      runValidators : true
    });
    console.log("user---->>>>",user)
    res.send("User updated successfully");
  }
  catch(err){
    res.status(400).send("UPDATE FAILDED :" + err.message)
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

