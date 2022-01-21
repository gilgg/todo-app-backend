const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(
  process.env.MONGODB_URL,
  () => {
    console.log("connected to DB!");
  }
);
