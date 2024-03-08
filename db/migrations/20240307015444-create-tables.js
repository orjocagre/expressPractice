'use strict';

const { USER_TABLE, UserSchema } = require('./../models/user.model');
const { PRODUCT_TABLE, ProductSchema } = require('./../models/product.model');
const { CATEGORY_TABLE, CategorySchema } = require('./../models/category.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
