import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const creatbranch=joi.object({
    city:joi.string().required().messages({
        'string.base': `name should be a type of 'text'`,
        'string.empty': `name cannot be an empty field`,
        'any.required': `name is a required field`}),
    name:joi.string().required().messages({
        'string.base': `name should be a type of 'text'`,
        'string.empty': `name cannot be an empty field`,
        'any.required': `name is a required field`}),
        StoreId:generalFields.id,
}).required()

export const updatebranch=joi.object({
    branchId:generalFields.id,
    StoreId:generalFields.id,
    name:joi.string(),
    city:joi.string()
}).required()