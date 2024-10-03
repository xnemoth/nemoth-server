const mongoose = require("mongoose");

const MONGODB_CONNECT_URI = process.env.MONGODB_CONNECT_URI;

// Connect DB
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_CONNECT_URI;
    if (!uri) {
      throw new Error("No data URL");
    }
    const conn = await mongoose.connect(uri);
    console.log(`database connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1); // Exit process with failure status 1 in case of error
  }
};

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));

module.exports = connectDB;