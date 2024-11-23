import Joi from "joi";
import { emailRegexp } from "../constants/users.js";

export const authRegisterSchema = Joi.object({
    name: Joi.string().min(4).max(30).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});


export const authLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

export const requestResetEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});

export const resetPaswordSchema = Joi.object({
    password: Joi.string().required(),
    token: Joi.string().required(),
});
