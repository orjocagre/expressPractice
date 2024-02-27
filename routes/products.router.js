const express = require('express');
const ProductsService = require('./../services/product.services');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schemas/product.schma');
const router = express.Router();
const service = new ProductsService();

// router.get('/', (req, res) => {
//   res.send('hola');
// })

router.get('/', async (req, res) => {
  const { initial } = req.query;
  const { size } = req.query;
  const limit = size || 10;

  const products = await service.find(limit, initial);
  res.status(200).json(products);
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
  },
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const rta = await service.delete(id, body);
  res.json(rta);
});

module.exports = router;
