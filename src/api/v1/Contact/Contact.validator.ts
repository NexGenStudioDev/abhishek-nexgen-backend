import Joi from 'joi';

export let createContact_Validator = Joi.object({
  name: Joi.string().max(60).required().messages({
    'string.base': `Name should be a type of text`,
    'string.empty': `Name cannot be an empty field`,
    'string.max': `Name should have a maximum length of {#limit}`,
    'any.required': `Name is a required field`,
  }),
  email: Joi.string().email().required().messages({
    'string.base': `Email should be a type of text`,
    'string.empty': `Email cannot be an empty field`,
    'string.email': `Email should be a valid email`,
    'any.required': `Email is a required field`,
  }),
  phone: Joi.number().required().messages({
    'number.base': `Phone should be a type of number`,
    'number.empty': `Phone cannot be an empty field`,
    'any.required': `Phone is a required field`,
  }),

  message: Joi.string().max(120).required().messages({
    'string.base': `Message should be a type of text`,
    'string.empty': `Message cannot be an empty field`,
    'any.required': `Message is a required field`,
    'string.max': `Message should have a maximum length of {#limit}`,
  }),
});
