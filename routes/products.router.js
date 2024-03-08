const express = require('express');
const ProductsService = require('./../services/product.services');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
} = require('./../schemas/product.schema');
const router = express.Router();
const service = new ProductsService();

// router.get('/', (req, res) => {
//   res.send('hola');
// })

router.get('/',
validatorHandler(queryProductSchema, 'query'),
async (req, res, next) => {

  try {
    const products = await service.find(req.query);
    res.status(200).json(products);
  }
  catch (err) {
    next(err);
  }
});

router.get('/filter', async (req, res) => {
  res.send('yo soy un filter');
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  },
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
validatorHandler(getProductSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const rta = await service.delete(id, body);
    res.json(rta);
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
