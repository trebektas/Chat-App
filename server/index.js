import express from "express";
import * as http from "http";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

// The environment should set the port
const port = process.env.PORT;

if (port == null) {
  // If this fails, make sure you have created a `.env` file in the right place with the PORT set
  console.log(
    new Error("Cannot find a PORT number, did you create a .env file?")
  );
}

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

const startServer = async () => {
  try {
    await connectDB();
    server.listen(3001, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
