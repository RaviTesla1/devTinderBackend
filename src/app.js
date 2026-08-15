const express = require("express");
const app = express();

const { connectDB } = require("./config/database");
const User = require("./models/user");
const {validationSignupData} = require("./utils/validation");
const bcrypt = require('bcrypt');
const validator = require("validator");




app.use(express.json());

app.post("/signup", async (req, res) => {
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
app.post("/login",async (req, res) => {
  try {
      const {emailId,password } = req.body;
      const user = await User.findOne({emailId : emailId})

      if (!validator.isEmail(emailId)) {
          throw new Error("Email is not valid")
        }
      
        if(!user){
          throw new Error("Invalid Credentials")
        }
      const isPasswordValid =await bcrypt.compare(password,user.password)

      if(isPasswordValid){
        res.send("User login successfull")
      }
      else{
        throw new Error("Invalid Credentials")
      }
  }catch (err) {
    res.status(400).send("Error saving the user :" + err.message);
  }
})

// Get user by email
app.get("/user", async (req, res) => {
  const emailId = req.body.emailId;

  try {
    const users = await User.findOne({ emailId: emailId });

    if (!users) {
      res.status(404).send("User not found");
    } else res.send(users);
  } catch (err) {
    res.status(400).send("User not found :" + err.message);
  }
});
// Feed Api - GET / feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = await req.body.userId;
  try {
    // await User.findByIdAndDelete(userId)
    await User.findByIdAndDelete({ _id: userId });
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// USER UPDATE :
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
      "userId",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
        ALLOWED_UPDATES.includes(k)
    )

    /* const keys = Object.keys(data);

    let isUpdateAllowed = true;

    for (let i = 0; i < keys.length; i++) {
      if (!ALLOWED_UPDATES.includes(keys[i])) {
        isUpdateAllowed = false;
        break;
      }
    } */
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if(data?.skills?.length > 0){
      throw new Error("Skills cannnot be more than 10")
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    console.log("err.message ====>>>>",err.message)
    res.status(400).send("UPDATE FAILDED :" + err.message);
  }
});

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
