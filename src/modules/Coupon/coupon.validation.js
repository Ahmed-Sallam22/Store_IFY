import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const creatCoupon=joi.object({
    name:joi.string().required().messages({
        'string.base': `name should be a type of 'text'`,
        'string.empty': `name cannot be an empty field`,
        'any.required': `name is a required field`}),
    amount:joi.number().positive().min(1).max(100).required()
}).required()

export const updateCoupon=joi.object({
    couponId:generalFields.id,
    amount:joi.number().positive().min(1).max(100),
    name:joi.string(),
}).required()