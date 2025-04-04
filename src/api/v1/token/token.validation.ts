import Joi from 'joi';

export let CreateToken_Validator = Joi.object({
  userId: Joi.string().required().messages({
    'string.base': 'userId must be a string',
    'string.empty': 'userId is required',
    'any.required': 'userId is required',
  }),
  accessToken: Joi.string().required().messages({
    'string.base': 'accessToken must be a string',
    'string.empty': 'accessToken is required',
    'any.required': 'accessToken is required',
  }),

  refreshToken: Joi.string().required().messages({
    'string.base': 'refreshToken must be a string',
    'string.empty': 'refreshToken is required',
    'any.required': 'refreshToken is required',
  }),
});
