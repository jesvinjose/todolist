const mongoose = require("mongoose");

require("dotenv");

const mongodb_url = process.env.mongodb_url;

const connectDb = async () => {
  try {
    const conn=await mongoose.connect(mongodb_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
  
};

module.exports = connectDb;
