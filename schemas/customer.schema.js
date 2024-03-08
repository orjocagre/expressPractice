const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().pattern(/^[a-zA-Z]+$/);
const lastName = Joi.string().pattern(/^[a-zA-Z]$/);
const phone = Joi.string();
const userId = Joi.number().integer();

const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const createdAt = Joi.date();
const role = Joi.string();


const getCustomerSchema = Joi.object({
  id: id.required()
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName,
  phone: phone,
  user: Joi.object({
    email: email.required(),
    password: password.required(),
    createdAt: createdAt,
    role: role
  })
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId.required()
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
