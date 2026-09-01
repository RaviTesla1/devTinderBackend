const express = require("express");

const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user");

// Send CONNECTION REQUEST
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res, next) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid Status type",
        });
      }

      if (fromUserId === toUserId) {
        throw new Error("User Cannot send request to himself/herself");
      }
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        throw new Error("Connection request already existed !!!");
      }

      const dbExistedUSer = await User.findById(toUserId);

      if (!dbExistedUSer) {
        return res.status(404).json({
          message: "User not  found !!!",
        });
      }

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.send({
        message:
          status === "interested"
            ? "Connection Request sent successfully!!!"
            : status === "ignored"
              ? "Connection request ignored"
              : "Invalid status",
        data,
      });
    } catch (err) {
      res.status(400).send("ERRORdddddddd : " + err.message);
    }
  },
);

module.exports = requestRouter;
