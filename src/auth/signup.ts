// Import lar
import { Request, Response } from 'express';
import { JwtHelper } from '../utils/token/users.token.js';
import { hashedHelper } from '../utils/hashedPassword/password.hashed.js';
import { users } from '../models/users.models.js';
import nodemailer from 'nodemailer';
import redis from 'redis';

// Redis ulash obyekti
const redisClient = redis.createClient();

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, email } = req.body;

    // Parolni hash qilish
    const passworhash = await hashedHelper.hash(password);

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
    await users.create({
      username,
      password: passworhash,
      email,
    });

    res.status(201).json(data);
  } catch (error: any) {
    console.error(error.message);
    process.exit(-1);
  }
};

// OTP yaratish funksiyasi
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// OTP ni yuborish funksiyasi
const sendOTP = (email: string, otp: string) => {
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
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

const saveOTPToRedis = (email: string, otp: string) => {
//   redisClient.set(email, otp, 'EX', 3600);
};

