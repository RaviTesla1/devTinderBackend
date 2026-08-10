const express = require('express');

const app  = express();

app.get("/user",(req,res) =>{
  res.send({"firstName": "ravi" , "lastname": "kumar"})
})

app.post("/user",(req,res) =>{
  console.log("Save data to the database");
  res.send("Data successfully saved to the database")
})

app.delete("/user",(req,res)=> {
  res.send("Data successfully deleted")
})

app.use("/test", (req, res) => {
  res.send("Hello world from the server")
})

// app.use("/", (req, res) => {
//   res.send("Namaste from from the Dashboard")
// })
// app.use("/hello/2", (req, res) => {
//   res.send("Abra ka dabra")
// })

// app.use("/hello", (req, res) => {
//   res.send("Hello hello hello")
// })


app.listen(3000,() => {
  console.log("Server is succuessfully running on port 3000")
})