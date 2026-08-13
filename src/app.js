const express = require("express");
const app = express();

app.use("/",(err,req,res,next) => {
  if(err){
    res.status(500).send("Something went wrong")
  }
})
 

app.get("/getUserData", (req, res) => {
  // try{
    throw new Error("njkfjdjk");
    res.send("User Data Sent");
  // }
 /*  catch(err){
    res.status(500).send("some error found contact support team");
  } */
  
});
app.use("/",(err,req,res,next) => {
  if(err){
    res.status(500).send("Unauthorized request")
  }
})


app.listen(3000, () => {
  console.log("Server is succesfully running on port 3000");
});
