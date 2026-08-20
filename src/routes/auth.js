const express = require("express");

const authRouter = express.Router();
const {validationSignupData} = require("../utils/validation");
const bcrypt = require('bcrypt');
const User = require("../models/user");
const validator = require("validator");




// SIGN UP
authRouter.post("/signup", async (req, res) => {
  // Creating a  new instance of new user model
  
  try {
    validationSignupData(req)
    
    const {firstName,lastName,emailId,password} = req.body;
    
    const hashPassword = await bcrypt.hash(password, 10);
    console.log('hashPassword====>',hashPassword)
    
    const user = new User({
      firstName,lastName,emailId,password :hashPassword
    });
    
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user :" + err.message);
  }
});

// Login api
authRouter.post("/login",async (req, res) => {
  try {
      const {emailId,password } = req.body;
      const user = await User.findOne({emailId : emailId})

      if (!validator.isEmail(emailId)) {
          throw new Error("Email is not valid")
        }
      
        if(!user){
          throw new Error("Invalid Credentials")
        }
      const isPasswordValid = user.validatePassword(password);

      if(isPasswordValid){
        // Create a JWT TOKEN
        const token = await user.getJWT();
        console.log("token===>>>",token)

        res.cookie("token",token, {
          expires : new Date(Date.now()  + 1 * 3600000 )})
        res.send("Login Successfull !!!")
      }
      else{
        throw new Error("Invalid Credentials")
      }
  }catch (err) {
    res.status(400).send("Error saving the user :" + err.message);
  }
})


module.exports = authRouter;