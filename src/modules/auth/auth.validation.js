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
export const token=joi.object({
    token:joi.string().required(),

}).required