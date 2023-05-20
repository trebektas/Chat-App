import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";

dotenv.config();

// The environment should set the port
const port = process.env.PORT;

import app from "./app.js";

if (port == null) {
  // If this fails, make sure you have created a `.env` file in the right place with the PORT set
  console.log(
    new Error("Cannot find a PORT number, did you create a .env file?")
  );
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3001, () => {
      console.log(`Server started on port 3001`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
