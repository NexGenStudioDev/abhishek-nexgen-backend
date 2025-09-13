import Joi from 'joi';
import { CallBack_Schema_Type } from './CallBack.type';

export let Create_CallBack_Validator = Joi.object<CallBack_Schema_Type>({
  Name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
    'any.required': 'Name is required',
  }),

  Phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.base': 'Phone must be a string',
      'string.empty': 'Phone is required',
      'string.pattern.base': 'Phone must be a valid 10-digit number',
      'any.required': 'Phone is required',
    }),

  Date: Joi.date().required().messages({
    'date.base': 'Date must be a valid date',
    'any.required': 'Date is required',
  }),

  Status: Joi.string()
    .valid('Pending', 'Completed', 'Cancelled')
    .required()
    .messages({
      'string.base': 'Status must be a string',
      'any.required': 'Status is required',
      'any.only': 'Status must be one of [Pending, Completed, Cancelled]',
    }),

  Time: Joi.object({
    Hours: Joi.number().min(1).max(12).required().messages({
      'number.base': 'Hours must be a number',
      'number.min': 'Hours should be at least {#limit}',
      'number.max': 'Hours should be at most {#limit}',
      'any.required': 'Hours is required',
    }),
    Minutes: Joi.number().min(0).max(59).required().messages({
      'number.base': 'Minutes must be a number',
      'number.min': 'Minutes should be at least {#limit}',
      'number.max': 'Minutes should be at most {#limit}',
      'any.required': 'Minutes is required',
    }),
    Meridiem: Joi.string().valid('AM', 'PM').required().messages({
      'string.base': 'Meridiem must be a string',
      'any.required': 'Meridiem is required',
      'any.only': 'Meridiem must be one of [AM, PM]',
    }),
  })
    .required()
    .messages({
      'object.base': 'Time must be an object',
      'any.required': 'Time is required',
    }),
});
