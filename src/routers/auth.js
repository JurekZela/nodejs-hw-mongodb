import { Router } from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js"

import { authRegisterSchema, authLoginSchema, requestResetEmailSchema } from "../validation/auth.js";
import * as authControllers from "../controllers/auth.js";

const authRouter = Router();

authRouter.post('/register', validateBody(authRegisterSchema), ctrlWrapper(authControllers.registerController));

authRouter.post("/login", validateBody(authLoginSchema), ctrlWrapper(authControllers.loginController));

authRouter.post("/refresh", ctrlWrapper(authControllers.refreshSessionController));

authRouter.post("/logout", ctrlWrapper(authControllers.logoutSessionController));

authRouter.post("/send-reset-email", validateBody(requestResetEmailSchema), ctrlWrapper(authControllers.requestResetEmailController) );

export default authRouter;
