import mongoose from 'mongoose';
import { emailRegexp } from '../../constants/index.js';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, match: emailRegexp, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true, versionKey: false });

export const User = mongoose.model('User', userSchema);
