import Joi from 'joi';

export const createAuth_Validator = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Role name must be a string',
    'string.empty': 'Role name is required',
    'string.min': 'Role name should have a minimum length of {#limit}',
    'string.max': 'Role name should have a maximum length of {#limit}',
    'any.required': 'Role name is required',
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email is required',
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email address',
    }),

  Password: Joi.string().min(4).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password should have at least {#limit} characters',
    'any.required': 'Password is required',
  }),

  role: Joi.string().valid('Super Admin', 'Admin').required().messages({
    'string.base': 'Role must be a string',
    'any.required': 'Role is required',
    'any.only': 'Role must be one of [admin, user, moderator]',
  }),
});

export const loginAuth_Validator = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email is required',
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email address',
    }),

  Password: Joi.string().min(4).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password should have at least {#limit} characters',
    'any.required': 'Password is required',
  }),
});

export const jwtAccessTokenSchema = Joi.object({
  userId: Joi.string().required().messages({
    'string.base': 'User ID must be a string',
    'string.empty': 'User ID is required',
    'any.required': 'User ID is required',
  }),

});

export const jwtRefreshTokenSchema = Joi.object({
  userId: Joi.string().required().messages({
    'string.base': 'User ID must be a string',
    'string.empty': 'User ID is required',
    'any.required': 'User ID is required',
  }),
});
