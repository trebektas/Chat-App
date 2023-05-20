import express from "express";
import cors from "cors";

import usersRouter from "./routes/user.js";
import groupsRouter from "./routes/group.js";
import messagesRouter from "./routes/message.js";

// Create an express server
const app = express();
// Tell express to use the json middleware
app.use(express.json());
app.use(cors());

app.use("/users", usersRouter);
app.use("/groups", groupsRouter);
app.use("/messages", messagesRouter);

export default app;
