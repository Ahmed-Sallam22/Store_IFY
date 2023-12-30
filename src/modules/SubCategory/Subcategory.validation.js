import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const creatSubCategory=joi.object({
    name:joi.string().required().messages({
        'string.base': `name should be a type of 'text'`,
        'string.empty': `name cannot be an empty field`,
        'any.required': `name is a required field`}),
        categoryId:generalFields.id,
}).required()

export const updateSubCategory=joi.object({
    SubcategoryId:generalFields.id,
    categoryId:generalFields.id,
    name:joi.string(),
}).required()