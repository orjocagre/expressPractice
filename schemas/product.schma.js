const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const category = Joi.string().uuid();


const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  category: category.required()
});


const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  category: category
});

const getProductSchema = Joi.object({
  id: id.required()
});


module.exports = { createProductSchema, updateProductSchema, getProductSchema };
