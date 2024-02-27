const express = require('express');
const router = express.Router();
const CategoriesService = require('./../services/category.services');
const service = new CategoriesService();
const validatorHandler = require('./../middlewares/validator.handler');

const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('./../schemas/category.schma');

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await service.find());
  } catch(err) {
    next(err);
  }
});

router.get('/:id',
validatorHandler(getCategorySchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(200).json(await service.findOne(id));
  }
  catch( err ) {
    next(err);
  }
}
);

router.post('/', validatorHandler(createCategorySchema, 'body'), async (req, res, next) => {
  try {
    res.status(201).json(await service.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.patch('/:id',
validatorHandler(updateCategorySchema, 'params'),
validatorHandler(createCategorySchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    res.status(200).json(await service.update(id, body))
  }
  catch (err) {
    next(err);
  }
}
);


router.delete('/:id',
validatorHandler(getCategorySchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(200).json(await service.delete(id));
  }
  catch ( err ) {
    next(err);
  }
}
);


module.exports = router;
