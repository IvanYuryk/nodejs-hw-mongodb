import express from 'express';
import {registerController, loginController, refreshController, logoutController} from '../controllers/auth.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../validation/validateBody.js';

import { userRegisterSchema, userLoginSchema } from '../validation/userValidation.js';

const router = express.Router();

router.post("/register", validateBody(userRegisterSchema), ctrlWrapper(registerController));

router.post("/login", validateBody(userLoginSchema), ctrlWrapper(loginController));

router.post ("/refresh", ctrlWrapper(refreshController));

router.post ("/logout", ctrlWrapper(logoutController));

export default router;
