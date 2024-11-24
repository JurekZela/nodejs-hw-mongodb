import { Router } from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js"

import * as joiSchemas from "../validation/auth.js";
import * as authControllers from "../controllers/auth.js";

const authRouter = Router();

authRouter.post('/register', validateBody(joiSchemas.authRegisterSchema), ctrlWrapper(authControllers.registerController));

authRouter.post("/login", validateBody(joiSchemas.authLoginSchema), ctrlWrapper(authControllers.loginController));

authRouter.post("/refresh", ctrlWrapper(authControllers.refreshSessionController));

authRouter.post("/logout", ctrlWrapper(authControllers.logoutSessionController));

authRouter.post("/send-reset-email", validateBody(joiSchemas.requestResetEmailSchema), ctrlWrapper(authControllers.requestResetEmailController));

authRouter.post("/reset-pwd", validateBody(joiSchemas.resetPaswordSchema), ctrlWrapper(authControllers.resetPwdController));

export default authRouter;
