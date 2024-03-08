const boom = require('@hapi/boom');
const { v4: uuidv4 } = require('uuid');
const { models } = require('./../libs/sequelize');

class CategoriesService {
  constructor() {
    // this.categories = [];
    // this.generate();
  }

  // generate() {
  //   this.categories = require('./../routes/db.json').categories;
  // }

  async find() {
    // return this.categories;
    const res = await models.Category.findAll();
    return res;

  }

  async findOne(id) {
    // const category = this.categories.find(item => item.id === id);
    // if(!category) {
    //   throw boom.notFound('Category not found');
    // }
    // return category;

    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if(!category) {
      throw boom.notFound('category not found');
    }
    return category;

  }

  async create(data) {
    // const category = {
    //   id: Math.floor(Math.random() * 1000),
    //   ...data
    // };
    // this.categories.push(category);
    // return category;

    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async update(id, changes) {
    // const index = this.categories.findIndex(item => item.id = id);
    // if(index === -1) {
    //   return boom.notFound('Category not found');
    // }
    // const category = this.categories[index];
    // this.categories[index] = {
    //   ...category,
    //   ...changes
    // }
    // return this.categories[index];

    const category = await this.findOne(id);
    const res = category.update(changes);
    return res;
  }

  async delete(id) {
    // const index = this.categories.findIndex(item => item.id = id);
    // if(index === -1) {
    //   throw boom.notFound('Category not found');
    // }
    // this.categories.splice(index, 1);
    // return { id };

    const category = await this.findOne(id);
    category.destroy();
    return { id };
  }

}

module.exports = CategoriesService;
