const express = require("express");

const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth")

// Send CONNECTION REQUEST
requestRouter.post("/sendConnectionRequest",userAuth, (req,res,next) => {
  const user = req.user;
  console.log("connnection request");

  res.send(user.firstName + " sent Connection request");
}
)

module.exports = requestRouter;