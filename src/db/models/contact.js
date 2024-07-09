import mongoose from 'mongoose';
import { typeList } from "../../constants/index.js";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  isFavourite: { type: Boolean, default: false },
  contactType: {
    type: String,
    enum: typeList,
    required: true,
    default: "personal",
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
}, { timestamps: true,
     versionKey: false
 });

export const Contact = mongoose.model('Contact', contactSchema);
