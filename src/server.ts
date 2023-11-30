import 'dotenv/config'
import express from 'express'
import {connectDB} from './utils/config/db.conf.js'
import { authRouter } from './users/routes/auth.routes.js'
import { userRouter } from './users/routes/user.routes.js'
const port = process.env.SERVER_PORT


async function startServer(): Promise<void> {
    try {
        const app = express()
        app.use(express.json())
        await connectDB()

        app.use(authRouter)
        app.use(userRouter)
        app.listen(port)
        console.log("Server is running... ");
        
    } catch (error: any) {
        console.error(error.message);
        process.exit(-1)
    }
}
startServer()