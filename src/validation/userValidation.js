import Joi from 'joi';
import { emailRegexp } from '../constants/index.js';

export const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});