import { Router } from "express";
import { signup } from "../../auth/signup.js";
import { signin } from "../../auth/signin.js";

export const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)