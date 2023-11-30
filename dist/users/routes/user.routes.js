import { Router } from "express";
import { userGet } from "../connection/users.connection.js";
export const userRouter = Router();
userRouter.get('/users', userGet);
