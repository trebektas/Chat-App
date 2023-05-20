import express from "express";
import { getMessages, createMessage } from "../controllers/message.js";

const messagesRouter = express.Router();

messagesRouter.post("/", getMessages);
messagesRouter.post("/create", createMessage);

export default messagesRouter;
