import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const creatCategory=joi.object({
    name:joi.string().required().messages({
        'string.base': `name should be a type of 'text'`,
        'string.empty': `name cannot be an empty field`,
        'any.required': `name is a required field`}),
    description:joi.string().min(2).required().messages({
        'string.empty': `description cannot be an empty field`,
        'string.min': `description should have a minimum length of {#limit}`,
        'any.required': `description is a required field`}),
    file:generalFields.file.required()
}).required()

export const updateCategory=joi.object({
    categoryId:generalFields.id,
    name:joi.string(),
    description:joi.string().min(2),
    file:generalFields.file
}).required()