const boom = require('@hapi/boom');
class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }


  generate() {
    this.products = require('../routes/db.json').products;
  }

  async create(data) {
    const newProduct = {
      id: (Math.floor(Math.random()*1000)).toString(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // find() {
  //   return new Promise ((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(this.products);
  //     }, 5000);
  //   });
  // }

  async find(limit, initial) {
    if(initial) {
      const productFiltered = this.products.filter(product => product.name[0] === initial);
      return productFiltered.slice(0, limit);
    }
    else {
      return this.products.slice(0, limit);
    }
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;

  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];

  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
