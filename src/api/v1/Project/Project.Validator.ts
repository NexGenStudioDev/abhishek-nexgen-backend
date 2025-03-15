import Joi from 'joi';

export let Create_Project_Validator = Joi.object({
  title: Joi.string().required().max(50).messages({
    'string.base': `Title should be a type of 'text'`,
    'string.empty': `Title cannot be an empty field`,
    'any.required': `Title is required`,
    'string.max': `Title should have a maximum length of {#limit}`,
  }),
  description: Joi.string().required().max(500).messages({
    'string.base': `Description should be a type of 'text'`,
    'string.empty': `Description cannot be an empty field`,
    'any.required': `Description is required`,
    'string.max': `Description should have a maximum length of {#limit}`,
  }),
  techStack: Joi.array().items(Joi.string()).required().messages({
    'array.base': `TechStack should be a type of 'array'`,
    'array.empty': `TechStack cannot be an empty field`,
    'any.required': `TechStack is required`,
  }),
  features: Joi.array().items(Joi.string()).required().messages({
    'array.base': `Features should be a type of 'array'`,
    'array.empty': `Features cannot be an empty field`,
    'any.required': `Features is required`,
  }),
  bg_color: Joi.string().required().messages({
    'string.base': `Background color should be a type of 'text'`,
    'string.empty': `Background color cannot be an empty field`,
    'any.required': `Background color is required`,
  }),

  links: Joi.array()
    .items(
      Joi.object({
        label: Joi.string().required().messages({
          'string.base': `Lable should be a type of 'text'`,
          'string.empty': `Lable cannot be an empty field`,
          'any.required': `Lable is required`,
        }),
        link: Joi.string().required().messages({
          'string.base': `Link should be a type of 'text'`,
          'string.empty': `Link cannot be an empty field`,
          'any.required': `Link is required`,
        }),
      }),
    )
    .required()
    .messages({
      'array.base': `Links should be a type of 'array'`,
      'array.empty': `Links cannot be an empty field`,
      'any.required': `Links is required`,
    }),
  video: Joi.string().required().messages({
    'string.base': `Video should be a type of 'text'`,
    'string.empty': `Video cannot be an empty field`,
    'any.required': `Video is required`,
  }),
});
