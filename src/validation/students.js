import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 30 characters long',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(7).max(15).required().messages({
    'string.base': 'Phone number must be a string',
    'string.min': 'Phone number must be at least 7 characters long',
    'string.max': 'Phone number must be at most 15 characters long',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().min(5).max(40).required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be valid',
    'string.min': 'Email must be at least 5 characters long',
    'string.max': 'Email must be at most 40 characters long',
    'any.required': 'Email is required',
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
  avgMark: Joi.number().min(1).max(15).required().messages({
    'number.base': 'Average mark must be a number',
    'number.min': 'Average mark must be at least 1',
    'number.max': 'Average mark must be at most 15',
    'any.required': 'Average mark is required',
  }),
  onDuty: Joi.boolean().messages({
    'boolean.base': 'On duty must be a boolean',
  }),
  parentId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Parent id should be a valid mongo id');
    }
    return true;
  }),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.string().min(7).max(15),
  email: Joi.string().email(),
  age: Joi.number().integer().min(10).max(90),
  gender: Joi.string().valid('male', 'female', 'other'),
  avgMark: Joi.number().min(1).max(15),
  onDuty: Joi.boolean(),
});
