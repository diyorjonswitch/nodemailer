var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'dotenv/config';
import express from 'express';
import { connectDB } from './utils/config/db.conf.js';
import { authRouter } from './users/routes/auth.routes.js';
import { userRouter } from './users/routes/user.routes.js';
const port = process.env.SERVER_PORT;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const app = express();
            app.use(express.json());
            yield connectDB();
            app.use(authRouter);
            app.use(userRouter);
            app.listen(port);
            console.log("Server is running... ");
        }
        catch (error) {
            console.error(error.message);
            process.exit(-1);
        }
    });
}
startServer();
