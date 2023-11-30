import { Schema } from "mongoose";

export interface IUsers {
    username: string,
    password: string
}

export const usersSchema = new Schema<IUsers>( {
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})