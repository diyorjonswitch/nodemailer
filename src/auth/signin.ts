import { Request, Response } from "express";
import { JwtHelper } from "../utils/token/users.token.js";
import { hashedHelper } from "../utils/hashedPassword/password.hashed.js";
import { users } from "../models/users.models.js";

export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
    const { username, password } = req.body
    const user = await users.findOne({username})
    if (!user) {
        res.status(403).json({SECCES: 'user is not fount'})
        return
    }
    const createToken = {
        username,
        isAdmin: false
    }
    const userpass = user?.password
    const token = JwtHelper.sign(createToken)
    const passworhash = await hashedHelper.compare(password, userpass as string)
    const data = {
        username,
        passworhash,
        token,
        SECCES: "login"
    }
    res.status(201).json(data)
    } catch (error: any) {
        console.error(error.message);
        process.exit(-1)
    }
};
  
