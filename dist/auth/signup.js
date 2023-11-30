var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { JwtHelper } from '../utils/token/users.token.js';
import { hashedHelper } from '../utils/hashedPassword/password.hashed.js';
import { users } from '../models/users.models.js';
import nodemailer from 'nodemailer';
import redis from 'redis';
// Redis ulash obyekti
const redisClient = redis.createClient();
export const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        // Parolni hash qilish
        const passworhash = yield hashedHelper.hash(password);
        // JWT orqali token yaratish
        const createToken = {
            username,
            isAdmin: false,
        };
        const token = JwtHelper.sign(createToken);
        // OTP yaratish va foydalanuvchiga yuborish
        const otp = generateOTP();
        sendOTP(email, otp);
        saveOTPToRedis(email, otp);
        // Ma'lumotlar obyekti
        const data = {
            username,
            passworhash,
            token,
        };
        // Foydalanuvchini saqlash
        yield users.create({
            username,
            password: passworhash,
            email,
        });
        res.status(201).json(data);
    }
    catch (error) {
        console.error(error.message);
        process.exit(-1);
    }
});
// OTP yaratish funksiyasi
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
// OTP ni yuborish funksiyasi
const sendOTP = (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'xujayorova71@gmail.com',
            pass: 'Abror2004',
        },
    });
    const mailOptions = {
        from: 'xujayorova71@gmail.com@gmail.com',
        to: email,
        subject: 'One Time Password (OTP) Confirmation',
        text: `Your OTP is: ${otp}. It is valid for 1 hour.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(`Email sent: ${info.response}`);
        }
    });
};
// OTP ni Redis ga saqlash
const saveOTPToRedis = (email, otp) => {
    //   redisClient.set(email, otp, 'EX', 3600); // 1 soatlik muddatga
};
