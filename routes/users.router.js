const express = require('express');
const router = express.Router();

const UsersService = require('./../services/user.services');
const service = new UsersService();

router.get('/', (req, res) => {
  res.status('201').json(service.find());
});

module.exports = service;
