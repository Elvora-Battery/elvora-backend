import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Setup transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Atau sesuaikan dengan layanan email yang digunakan
    port:465,
    secure:true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    
});

const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Elvora OTP Code',
        text: `Your OTP code is ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
};

const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
};


export { sendOtpEmail, generateOtp };
