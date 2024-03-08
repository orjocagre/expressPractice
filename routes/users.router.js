const express = require('express');
const router = express.Router();

const UsersService = require('./../services/user.services');
const service = new UsersService();

const validatorHandler = require('./../middlewares/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('./../schemas/user.schema');

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.findOne(id));
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (err) {
      next(err);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      console.group('b');
      const body = req.body;
      console.log(body);
      const { id } = req.params;
      console.log(id);
      const user = await service.update(id, body);
      console.log(user);
      res.status(200).json(user);
      console.groupEnd('b');
    } catch (err) {
      console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
      next(err);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
