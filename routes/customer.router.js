const CustomersService = require('./../services/customer.services');
const service = new CustomersService();
const express = require('express');
const router = express.Router();
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} = require('./../schemas/customer.schema');


router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();
    res.status(200).json(customers);
  }
  catch (err) {
    next(err);
  }
});

router.get('/:id',
validatorHandler(getCustomerSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await service.findOne(id);
    res.status(200).json(customer);
  }
  catch (err) {
    next(err);
  }
}
);

router.post('/',
validatorHandler(createCustomerSchema, 'body'),
async (req, res, next) => {
  try {
    const body = req.body;
    const customer = service.create(body);
    res.status(201).json(customer);
  }
  catch (err) {
    next(err);
  }
}
);

router.patch('/:id',
validatorHandler(getCustomerSchema, 'params'),
validatorHandler(updateCustomerSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const customer = service.update(id, body);
    res.status(200).json(customer);
  }
  catch (err) {
    next(err);
  }
}
);

router.delete('/:id',
validatorHandler(getCustomerSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = service.delete(id);
    res.status(200).json(customer);
  }
  catch (err) {
    next(err);
  }
}
);

module.exports = router;
