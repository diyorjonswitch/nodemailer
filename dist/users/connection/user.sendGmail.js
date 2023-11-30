import nodemailer from 'nodemailer';
import redis from 'redis';
const redisClient = redis.createClient();
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
const sendOTP = (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_email_password',
        },
    });
    const mailOptions = {
        from: 'your_email@gmail.com',
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
