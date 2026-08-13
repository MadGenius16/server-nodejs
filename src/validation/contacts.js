import Joi from 'joi';

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 30 characters long',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.number().min(10).max(30).required().messages({
    'number.base': 'Phone number must be a number',
    'number.min': 'Phone number must be at least 10 digits long',
    'number.max': 'Phone number must be at most 30 digits long',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().min(5).max(30).required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be valid',
    'string.min': 'Email must be at least 5 characters long',
    'string.max': 'Email must be at most 30 characters long',
    'any.required': 'Email is required',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Is favourite must be a boolean',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'Contact type must be a string',
      'string.valid': 'Contact type must be "work", "home" or "personal"',
      'any.required': 'Contact type is required',
    }),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.number().min(10).max(30),
  email: Joi.string().email().min(5).max(30),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
