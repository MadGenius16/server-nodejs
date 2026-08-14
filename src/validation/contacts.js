import Joi from 'joi';

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 30 characters long',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(8).max(20).required().messages({
    'string.base': 'Phone number must be a string',
    'string.min': 'Phone number must be at least 8 characters long',
    'string.max': 'Phone number must be at most 20 characters long',
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
  phoneNumber: Joi.string().min(8).max(20),
  email: Joi.string().email().min(5).max(30),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
