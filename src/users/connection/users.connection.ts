import { Request, Response } from "express";
import { users } from "../../models/users.models.js";

 
export const userGet = async (req: Request, res: Response) => {
    try {
        const user = await users.find();
        res.status(200).json(user);
    } catch (error: any) {
        console.error(error.message);
    }
}
