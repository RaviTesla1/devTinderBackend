const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
      },
    },
  },
  { timestamps: true },
);

connectionRequestSchema.index({
  fromUserId : 1,
  toUserId : 1
})

// We cannot also write this  logic in the API
connectionRequestSchema.pre("save",function(req,res,next){
  const connectionRequest = this;

  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Cannot send connection request to yourself")
  }
  console.log("1111111111111")
  next();
    console.log("2222222222")

})



const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
    connectionRequestSchema
)

module.exports = {
  ConnectionRequestModel
}