const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://vishalshankhdhar72_db_user:1pAVuU4FwRsXhthC@cluster0.tusx5cf.mongodb.net/?appName=Cluster0",
  )
  .then((res) => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log("Something Error", err);
  });

// 1pAVuU4FwRsXhthC
// vishalshankhdhar72_db_user

// mongodb+srv://vishalshankhdhar72_db_user:1pAVuU4FwRsXhthC@cluster0.tusx5cf.mongodb.net/?appName=Cluster0
