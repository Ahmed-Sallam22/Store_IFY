import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const signup={
    body:joi.object().required().keys(
        {
            userName:joi.string().required().min(3).max(20).messages({
                'string.base': `UserName should be a type of 'text'`,
                'string.empty': `UserName cannot be an empty field`,
                'string.min': `UserName should have a minimum length of {#limit}`,
                'string.max': `UserName should have a max length of {#limit}`,
                'any.required': `UserName is a required field`}),
            email:generalFields.email.messages({
                'string.email': `Email must be  Valid Email`,
                'string.empty': `Email cannot be an empty field`,
                'any.required': `Email is a required field`
              }),
            password:generalFields.password.messages({
                'string.pattern.base': `Password should be include A capital letter, a small letter, and a number `,
                'string.empty': `Password cannot be an empty field`,
                'any.required': `Password is a required field`
              }),
            confirmPassword:generalFields.confirmPassword.valid(joi.ref('password')).messages({
                'string.empty': `confirmPassword cannot be an empty field`,
                'any.only': `confirmPassword Not match the password`,
                'any.required': `confirmPassword is a required field`
              })
        }
    ) 
}
export const login={
    body:joi.object().required().keys(
        {
            email:generalFields.email.messages({
                'string.email': `Email must be  Valid Email`,
                'string.empty': `Email cannot be an empty field`,
                'any.required': `Email is a required field`
              }),
            password:generalFields.password.messages({
                'string.pattern.base': `Password should be include A capital letter, a small letter, and a number `,
                'string.empty': `Password cannot be an empty field`,
                'any.required': `Password is a required field`
              })
         
        }
    ) 
}

export const forgetPassword={
    body:joi.object().required().keys(
        {
            email:generalFields.email.messages({
                'string.email': `Email must be  Valid Email`,
                'string.empty': `Email cannot be an empty field`,
                'any.required': `Email is a required field`
              }),         
        }
    ) 
}

export const CheckCode={
    body:joi.object().required().keys({
        email:generalFields.email.messages({
            'string.email': `Email must be  Valid Email`,
            'string.empty': `Email cannot be an empty field`,
            'any.required': `Email is a required field`
          }),   
        forgetCode:joi.string().pattern(new RegExp(/^[0-9]{4}$/)).required().messages({
            'string.pattern.base': `forgetCode should be include 4 Numbers`,
            'string.empty': `forgetCode cannot be an empty field`,
            'any.required': `forgetCode is a required field`
        })
    }
        )}

export const RestePassword={
    body:joi.object().required().keys(
        {
            email:generalFields.email.messages({
                'string.email': `Email must be  Valid Email`,
                'string.empty': `Email cannot be an empty field`,
                'any.required': `Email is a required field`
              }),
            password:generalFields.password.messages({
                'string.pattern.base': `Password should be include A capital letter, a small letter, and a number `,
                'string.empty': `Password cannot be an empty field`,
                'any.required': `Password is a required field`
              }),
            confirmPassword:generalFields.confirmPassword.valid(joi.ref('password')).messages({
                'string.empty': `confirmPassword cannot be an empty field`,
                'any.only': `confirmPassword Not match the password`,
                'any.required': `confirmPassword is a required field`
              })
        }
    ) 
}


export const token={
    token:joi.string().required(),
}