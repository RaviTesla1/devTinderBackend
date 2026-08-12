const express = require("express");
const {adminAuth,userAuth} = require("./middlewares/auth")

const app = express();

app.use("/admin",adminAuth)
app.use("/use",userAuth)



app.get("/admin/getAllUser", (req, res, next) => {
  res.send("All user list");
});  

app.get("/user", (req, res) => {
  res.send("All user list");
});

app.get("/admin/deleteUser", (req, res, next) => {
  const token = "abc";
  const isAdminAuthorized = token === "abc";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized");
  } else res.send("User deleted succesfully");
});

app.listen(3000, () => {
  console.log("Server is succesfully running on port 3000");
});
