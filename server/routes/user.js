import express from "express";
import { checkUsername } from "../controllers/user.js";

const usersRouter = express.Router();

usersRouter.post("/login", checkUsername);

export default usersRouter;
