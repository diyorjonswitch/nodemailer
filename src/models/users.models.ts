import { model } from "mongoose";
import { IUsers, usersSchema } from "../Schema/user.schema.js";

export const users = model<IUsers>('users', usersSchema)