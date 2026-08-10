const express = require('express');

const app  = express();

app.get("/user",
  [(req,res,next) => {
  console.log("Handling user 1");
  
  next();
},
 (req,res,next) => {  
  console.log("Handling user 2");
  
  // res.send("User 2 created succesfully")
    next();

},
 (req,res,next) => {  
  
  console.log("Handling user 3");
      next();

  
  // res.send("User 3 created succesfully")
},
 (req,res,next) => {  
  
  console.log("Handling user 4");
  next();
  
  res.send("User 4 created succesfully")
}]
)




app.listen(3000,() => {
  console.log("Server is succesfully running on port 3000")
})