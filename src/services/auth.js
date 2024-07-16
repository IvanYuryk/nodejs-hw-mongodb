import createError from "http-errors";
import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";
import { SMTP } from "../constants/index.js";
import { sendEmail } from "../utils/sendMail.js";
import { User } from "../db/models/user.js";
import { hashValue } from "../utils/hash.js";

export const findUser = filter => User.findOne(filter);

export const signup = async (data) => {
    const { password } = data;
    const hashPassword = await hashValue(password);
    return User.create({ ...data, password: hashPassword });
};

export const requestResetToken = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, 'User not found');
    }
    const resetToken = jwt.sign(
      {
        sub: user._id,
        email,
      },
      env('JWT_SECRET'),
      {
        expiresIn: '15m',
      },
    );
    await sendEmail({
      // from: env(SMTP.SMTP_USER),
      from: "bogdan.lyamzin.d@gmail.com",
      to: email,
      subject: 'Reset your password',
      html: `<p>Click <a href="${resetToken}">here</a> to reset your password!</p>`,
    });
  };