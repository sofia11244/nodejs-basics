// src/validation/students.js

import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name must be a text',
    'string.min': 'Name must be at least {#limit} characters long',
    'string.max': 'Name must not exceed {#limit} characters',
    'any.required': 'Name is required',
  }),
  age: Joi.number().integer().min(6).max(16).required().messages({
    'number.base': 'Age must be a number',
    'number.integer': 'Age must be an integer',
    'number.min': 'Age must be at least {#limit}',
    'number.max': 'Age must not exceed {#limit}',
    'any.required': 'Age is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'Gender must be male, female, or other',
    'any.required': 'Gender is required',
  }),
  avgMark: Joi.number().min(2).max(12).required().messages({
    'number.base': 'Average mark must be a number',
    'number.min': 'Average mark must be at least {#limit}',
    'number.max': 'Average mark must not exceed {#limit}',
    'any.required': 'Average mark is required',
  }),
  onDuty: Joi.boolean().messages({
    'boolean.base': 'onDuty must be true or false',
  }),
  parentId: Joi.string().required(),
});

// Kullanım örneği
const validateStudent = (studentData) => {
  const { error } = createStudentSchema.validate(studentData, {
    abortEarly: false, // Tüm hataları almak için
  });

  if (error) {
    return error.details.map((err) => err.message); // Hata mesajlarını liste olarak döndür
  }
  return null; // Hata yoksa null döndür
};

export default validateStudent;

export const updateStudentSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    age: Joi.number().integer().min(6).max(16),
    gender: Joi.string().valid('male', 'female', 'other'),
    avgMark: Joi.number().min(2).max(12),
    onDuty: Joi.boolean(),
  });