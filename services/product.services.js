const boom = require('@hapi/boom');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const { models } = require('./../libs/sequelize');

class ProductsService {

  constructor() {
    // this.products = [];
    // this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.log(err));
  }


  // generate() {
  //   this.products = require('../routes/db.json').products;
  // }

  async create(data) {
    // this.products.push(newProduct);
    const res = await models.Product.create(data);
    return res;
  }

  // find() {
  //   return new Promise ((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(this.products);
  //     }, 5000);
  //   });
  // }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query;
    if(limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }


    const { price_min, price_max } = query;
    if(price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

    // const query = 'SELECT * FROM tasks';
    // const [data] = await sequelize.query(query);
    const res = await models.Product.findAll(options);
    return res;
    // if(initial) {
    //   const productFiltered = this.products.filter(product => product.name[0] === initial);
    //   return productFiltered.slice(0, limit);
    // }
    // else {
    //   return this.products.slice(0, limit);
    // }
  }

  async findOne(id) {
    // const product = this.products.find(item => item.id === id);
    // if (!product) {
    //   throw boom.notFound('product not found');
    // }
    // return product;

    const product = await models.Product.findByPk(id, {
      include: ['category']
    });
    if(!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, changes) {
    // const index = this.products.findIndex(item => item.id === id);
    // if(index === -1) {
    //   throw boom.notFound('product not found');
    // }
    // const product = this.products[index];
    // this.products[index] = {
    //   ...product,
    //   ...changes
    // };
    // return this.products[index];

    const product = await this.findOne(id);
    const res = await product.update(changes);

    return res;
  }

  async delete(id) {
    // const index = this.products.findIndex(item => item.id === id);
    // if(index === -1) {
    //   throw boom.notFound('Product not found');
    // }
    // this.products.splice(index, 1);
    // return { id };

    const product = await this.findOne(id);
    await product.destroy();

    return { id };

  }
}

module.exports = ProductsService;
