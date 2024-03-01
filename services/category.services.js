const boom = require('@hapi/boom');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    this.categories = require('./../routes/db.json').categories;
  }

  async find() {
    return this.categories;
  }

  async findOne(id) {
    const category = this.categories.find(item => item.id === id);
    if(!category) {
      throw boom.notFound('Category not found');
    }
    return category;

  }

  async create(data) {
    const category = {
      id: Math.floor(Math.random() * 1000),
      ...data
    };
    this.categories.push(category);
    return category;
  }

  async update(id, changes) {
    const index = this.categories.findIndex(item => item.id = id);
    if(index === -1) {
      return boom.notFound('Category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    }
    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex(item => item.id = id);
    if(index === -1) {
      throw boom.notFound('Category not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }

}

module.exports = CategoriesService;
