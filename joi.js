const Joi = require('joi');

module.exports.studentValidationSchema = Joi.object({
  admissionNo: Joi.string().required(),
  rollNo: Joi.string().required(),
  name: Joi.string().required(),
  fatherName: Joi.string().required(),
  address: Joi.string().required(),
  motherName: Joi.string().required(),
  mobileNo: Joi.string()
    .pattern(/^[6-9]\d{9}$/) // Validates a 10-digit Indian mobile number
    .required(),
  aadhar: Joi.string()
    .pattern(/^\d{12}$/) // Validates a 12-digit Aadhaar number
    .required(),
  class: Joi.string().required(),
  amount: Joi.object({
    due: Joi.number().min(0).required(),
    paid: Joi.number().min(0).required(),
  }).required(),
  age: Joi.number().integer().min(3).max(20).required(), // Assuming reasonable age range
  transport: Joi.string().required(), // Assuming transport is a yes/no field
  createdAt: Joi.date().default(Date.now),
});

module.exports.teacherValidationSchema = Joi.object({
    name: Joi.string().required(),
    aadhaar: Joi.string().pattern(/^\d{12}$/).required(),
    address: Joi.string().required(),
    subject: Joi.string().required(),
    email: Joi.string().email().required(),
    contact: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
    role: Joi.string(),
    amount: Joi.object({
        due: Joi.number().min(0).required(),
        paid: Joi.number().min(0).required(),
    }).required(),
    createdAt: Joi.date().default(Date.now),
    });