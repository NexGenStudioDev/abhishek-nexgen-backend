import Joi from 'joi';

export let Send_Mail_Validator = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email is required',
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email address',
    }),
  subject: Joi.string().required().max(40).messages({
    'string.base': 'Subject must be a string',
    'string.empty': 'Subject is required',
    'any.required': 'Subject is required',
    'string.max': 'Subject should have a maximum length of {#limit}',
  }),
  message: Joi.string().required().max(120).messages({
    'string.base': 'Text must be a string',
    'string.empty': 'Text is required',
    'any.required': 'Text is required',
    'string.max': 'Text should have a maximum length of {#limit}',
  }),
});
