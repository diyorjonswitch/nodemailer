import { model } from "mongoose";
import { usersSchema } from "../Schema/user.schema.js";
export const users = model('users', usersSchema);
