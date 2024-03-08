const express = require('express');
const router = express.Router();
const OrdersService = require('./../services/order.services');
const service = new OrdersService();
const validatorHandler = require('./../middlewares/validator.handler');

const {
  addItemSchema,
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
} = require('./../schemas/order.schema');

router.get('/:orderId/products/:productId', (req, res) => {
  const { orderId, productId } = req.params;
  res.json({
    orderId,
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
validatorHandler(getOrderSchema, 'params'),
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

router.post('/', validatorHandler(createOrderSchema, 'body'), async (req, res, next) => {
  try {
    res.status(201).json(await service.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.patch('/:id',
validatorHandler(updateOrderSchema, 'params'),
validatorHandler(createOrderSchema, 'body'),
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
validatorHandler(getOrderSchema, 'params'),
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

router.post('/add-item', validatorHandler(addItemSchema, 'body'), async (req, res, next) => {
  try {
    res.status(201).json(await service.addItem(req.body));
  } catch (err) {
    next(err);
  }
});



module.exports = router;
