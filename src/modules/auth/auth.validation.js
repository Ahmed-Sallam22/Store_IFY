import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const signup=joi.object({
    userName:joi.string().min(2).max(20).required(),
    Email:generalFields.email,
    password:generalFields.password,
    confirmPassword:generalFields.confirmPassword.valid(joi.ref('password'))
}).required
export const login=joi.object({
    Email:generalFields.email,
    password:generalFields.password,
}).required
export const sendCode=joi.object({
    Email:generalFields.email,
}).required
export const CheckCode=joi.object({
    Email:generalFields.email,
    forgetCode:joi.string().length(4).required(),
}).required
export const RestePassword=joi.object({
    Email:generalFields.email,
    password:generalFields.password,
    confirmPassword:generalFields.confirmPassword.valid(joi.ref('password')),
}).required
export const token=joi.object({
    token:joi.string().required(),

}).required