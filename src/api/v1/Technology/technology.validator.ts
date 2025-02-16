import Joi from 'joi';

export const validateTechnology = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    link: Joi.string().uri().required(),
  });

  return schema.validate(data);
};
