import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const createStore=joi.object({
    name:joi.string().required().messages({
        'string.base': `name should be a type of 'text'`,
        'string.empty': `name cannot be an empty field`,
        'any.required': `name is a required field`}),
    rate:joi.number().integer().positive().min(0).max(5).required(),
    file:generalFields.file.required(),
    type:joi.string().required().messages({
        'string.base': `type should be a type of 'text'`,
        'string.empty': `type cannot be an empty field`,
        'any.required': `type is a required field`})
}).required()

export const updateStore=joi.object({
    StoreId:generalFields.id,
    rate:joi.number().integer().positive().min(0).max(5),
    name:joi.string(),
    file:generalFields.file,
    type:joi.string()
}).required()