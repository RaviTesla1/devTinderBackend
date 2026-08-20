const express = require("express");
const app = express();

const { connectDB } = require("./config/database");
const User = require("./models/user");
const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")




app.use(express.json());
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);






connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server is succesfully running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database can't be connected" + err.message);
  });
