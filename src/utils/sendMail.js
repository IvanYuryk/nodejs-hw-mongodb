import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';
import { env } from '../utils/env.js';

// const transporter = nodemailer.createTransport({
//   host: env(SMTP.SMTP_HOST),
//   port: Number(env(SMTP.SMTP_PORT)),
//   secure: false,
//   auth: {
//     user: env(SMTP.SMTP_USER),
//     pass: env(SMTP.SMTP_PASSWORD),
//   },
//   // tls: {
//   //   rejectUnauthorized: false,
//   // },
// });

const nodemailerConfig = {
  host: "smtp-relay.brevo.com",
  port: 587, 
  secure: false,
  auth: {
      user: "789105001@smtp-brevo.com",
      pass: "EytPNf94q2DdRQa0"
  }
};

const transporter = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = async (options) => {
  console.log(options);
  return await transporter.sendMail(options);
};


