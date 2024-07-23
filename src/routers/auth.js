import express from 'express';
import { validateBody } from '../validation/validateBody.js';
import {
    userRegisterSchema,
    userLoginSchema,
    requestResetEmailSchema,
    resetPasswordSchema,
    loginWithGoogleOAuthSchema
} from '../validation/userValidation.js';

import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import {
    registerController,
    loginController,
    refreshController,
    logoutController,
    requestResetEmailController,
    resetPasswordController,
    getGoogleOAuthUrlController,
    loginWithGoogleController
} from '../controllers/auth.js';

const router = express.Router();

router.post("/send-reset-email", validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

router.post("/reset-pwd", validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

router.post("/register", validateBody(userRegisterSchema), ctrlWrapper(registerController));

router.post("/login", validateBody(userLoginSchema), ctrlWrapper(loginController));

router.get("/get-oauth-url", ctrlWrapper(getGoogleOAuthUrlController));

router.post("/confirm-oauth", validateBody(loginWithGoogleOAuthSchema), ctrlWrapper(loginWithGoogleController));

router.post ("/refresh", ctrlWrapper(refreshController));

router.post ("/logout", ctrlWrapper(logoutController));

export default router;
