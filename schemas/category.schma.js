const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(2).max(30);

const createCategorySchema = Joi.object({
  name: name.required()
});

const updateCategorySchema = Joi.object({
  name: name
});

const getCategorySchema = Joi.object({
  id: id.required()
});


module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema };
