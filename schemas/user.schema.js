const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const createdAt = Joi.date();
const role = Joi.string();


const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  createdAt: createdAt.required(),
  role: role
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  createdAt: createdAt,
  role: role
});

const getUserSchema = Joi.object({
  id: id.required()
});



module.exports = { createUserSchema, updateUserSchema, getUserSchema };
