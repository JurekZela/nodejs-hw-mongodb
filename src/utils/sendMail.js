import nodemailer from 'nodemailer';

import { env } from './env.js';
import { SMTP } from '../constants/index.js';


const transporter = nodemailer.createTransport({
    host: env(SMTP.SMTP_HOST),
    port: Number(env(SMTP.SMTP_PORT)),
    secure: false,
    auth: {
        user: env(SMTP.SMTP_USER),
        pass: env(SMTP.SMTP_PASSWORD),
    },
});

export const sendEmail = async(options) => {
    const email = await {
        ...options,
        from: env(SMTP.SMTP_FROM),
    };

    return transporter.sendMail(email);
};
