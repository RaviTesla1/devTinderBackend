const express = require("express");

const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth")



// GET PROFILE
profileRouter.get("/profile",userAuth, async (req,res)=>{
  try{
    
  res.send(req.user)
  }catch (err) {
    res.status(400).send("User not found :" + err.message);
  }
})

module.exports = profileRouter;
