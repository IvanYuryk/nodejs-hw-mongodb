import express from 'express';
import {
    registerController,
    loginController,
    refreshController,
    logoutController,
    requestResetEmailController,
    resetPasswordController
} from '../controllers/auth.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../validation/validateBody.js';

import {
    userRegisterSchema,
    userLoginSchema,
    requestResetEmailSchema,
    resetPasswordSchema
} from '../validation/userValidation.js';

const router = express.Router();

router.post( '/request-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

router.post("/reset-password", validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

router.post("/register", validateBody(userRegisterSchema), ctrlWrapper(registerController));

router.post("/login", validateBody(userLoginSchema), ctrlWrapper(loginController));

router.post ("/refresh", ctrlWrapper(refreshController));

router.post ("/logout", ctrlWrapper(logoutController));

export default router;
