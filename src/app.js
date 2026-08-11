const express = require('express');

const app  = express();


app.get("/admin/getAllUser",
  (req,res,next) => {
    
    const token = "abc"
    const isAdminAuthorized = token === "abcd"
    if(!isAdminAuthorized){
      res.status(401).send("Unauthorized");   
    }
    else res.send("All user list")
   
  })

  app.get("/admin/deleteUser",
  (req,res,next) => {
    
    const token = "abc"
    const isAdminAuthorized = token === "abc"
    if(!isAdminAuthorized){
      res.status(401).send("Unauthorized");   
    }
    else res.send("User deleted succesfully")
   
  })
  
 
app.listen(3000,() => {
  console.log("Server is succesfully running on port 3000")
})