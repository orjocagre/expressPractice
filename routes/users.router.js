const express = require('express');
const router = express.Router();

const UsersService = require('./../services/user.services');
const service = new UsersService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.status('200').json(users);
  }
  catch(err) {
    next(err);
  }
});

module.exports = router;
