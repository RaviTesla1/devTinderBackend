const mongoose = require("mongoose")

const connectDB = async ()  => {
  await mongoose.connect(
    "mongodb+srv://ravibatalvi751_db_user:brlGTQFxtHJUcpDv@namastenode.lr4khls.mongodb.net/devTinder"
  )
}


module.exports = {
  connectDB
}

