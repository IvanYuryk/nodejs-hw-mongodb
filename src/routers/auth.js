import express from 'express';
import {signupController, signinController} from '../controllers/auth.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../validation/validateBody.js';

import { userSignupSchema, userSigninSchema } from '../validation/userValidation.js';

const router = express.Router();

router.post('/signup', validateBody(userSignupSchema), ctrlWrapper(signupController));

router.post('/signin', validateBody(userSigninSchema), ctrlWrapper(signinController));

export default router;
