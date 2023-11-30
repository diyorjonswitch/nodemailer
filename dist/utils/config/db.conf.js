var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbname = process.env.DB_NAME || 'users';
        const mongoURI = `mongodb://127.0.0.1:27017/${dbname}`;
        yield mongoose.connect(mongoURI);
        console.log("db connention");
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
});
export { connectDB };
