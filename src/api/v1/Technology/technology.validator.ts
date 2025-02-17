import Joi from 'joi';

export const validateTechnology = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'name must be a string',
    'string.empty': 'name is required',
    'string.min': 'name should have a minimum length of {#limit}',
    'string.max': 'name should have a maximum length of {#limit}',
    'any.required': 'name is required',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
    'any.required': 'Description is required',
  }),
  image: Joi.string().uri().required().messages({
    'string.base': 'Image must be a string',
    'string.empty': 'Image is required',
    'string.uri': 'Image must be a valid URI example: https://example.com',
    'any.required': 'Image is required',
  }),
  link: Joi.string().uri().required().messages({
    'string.base': 'Link must be a string',
    'string.empty': 'Link is required',
    'string.uri': 'Link must be a valid URI example: https://example.com',
    'any.required': 'Link is required',
  }),
});

export const validateTechnologyUpdate = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.base': 'name must be a string',
    'string.empty': 'name is required',
    'string.min': 'name should have a minimum length of {#limit}',
    'string.max': 'name should have a maximum length of {#limit}',
  }),
  description: Joi.string().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
  }),
  image: Joi.string().uri().messages({
    'string.base': 'Image must be a string',
    'string.empty': 'Image is required',
    'string.uri': 'Image must be a valid URI example: https://example.com',
  }),
  link: Joi.string().uri().messages({
    'string.base': 'Link must be a string',
    'string.empty': 'Link is required',
    'string.uri': 'Link must be a valid URI example: https://example.com',
  }),
});
