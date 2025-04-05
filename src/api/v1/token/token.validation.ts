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

export let RenewAccessToken_Validator = Joi.object({
  refresh_token: Joi.string().required().messages({
    'string.base': 'refresh_token must be a string',
    'string.empty': 'refresh_token is required',
    'any.required': 'refresh_token is required',
  }),
});
