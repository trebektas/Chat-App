import express from "express";
import { createGroup, getAllGroup } from "../controllers/group.js";

const groupsRouter = express.Router();

groupsRouter.post("/create", createGroup);
groupsRouter.get("/", getAllGroup);

export default groupsRouter;
