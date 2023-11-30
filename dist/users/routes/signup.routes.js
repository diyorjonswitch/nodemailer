import { Router } from "express";
import { signup } from "../../auth/signup.js";
export const authRouter = Router();
authRouter.post('/signup', signup);
