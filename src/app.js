const express = require('express');

const app  = express();

app.use("/hello/2", (req, res) => {
  res.send("Abra ka dabra")
})

app.use("/hello", (req, res) => {
  res.send("Hello hello hello")
})

app.use("/test", (req, res) => {
  res.send("Hello world from the server")
})

app.use("/", (req, res) => {
  res.send("Namaste from from the Dashboard")
})
app.listen(3000,() => {
  console.log("Server is succuessfully running on port 3000")
})