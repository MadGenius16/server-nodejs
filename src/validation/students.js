import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 30 characters long',
    'any.required': 'Name is required',
  }),
  age: Joi.number().integer().min(10).max(90).required().messages({
    'number.base': 'Age must be a number',
    'number.integer': 'Age must be an integer',
    'number.min': 'Age must be at least 10 years old',
    'number.max': 'Age must be at most 90 years old',
    'any.required': 'Age is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.base': 'Gender must be a string',
    'string.valid': 'Gender must be "male", "female" or "other"',
    'any.required': 'Gender is required',
  }),
  avgMark: Joi.number().min(2).max(15).required().messages({
    'number.base': 'Average mark must be a number',
    'number.min': 'Average mark must be at least 2',
    'number.max': 'Average mark must be at most 15',
    'any.required': 'Average mark is required',
  }),
  onDuty: Joi.boolean().messages({
    'boolean.base': 'On duty must be a boolean',
  }),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  age: Joi.number().integer().min(10).max(90),
  gender: Joi.string().valid('male', 'female', 'other'),
  avgMark: Joi.number().min(2).max(12),
  onDuty: Joi.boolean(),
});
