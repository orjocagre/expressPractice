const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class OrdersService {
  constructor() {
    // this.orders = [];
    // this.generate();
  }

  // generate() {
  //   this.orders = require('./../routes/db.json').orders;
  // }


  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    // return this.orders;
    const res = await models.Order.findAll();
    return res;

  }

  async findOne(id) {
    // const order = this.orders.find(item => item.id === id);
    // if(!order) {
    //   throw boom.notFound('Order not found');
    // }
    // return order;

    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if(!order) {
      throw boom.notFound('order not found');
    }
    return order;

  }

  async create(data) {
    // const order = {
    //   id: Math.floor(Math.random() * 1000),
    //   ...data
    // };
    // this.orders.push(order);
    // return order;

    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async update(id, changes) {
    // const index = this.orders.findIndex(item => item.id = id);
    // if(index === -1) {
    //   return boom.notFound('Order not found');
    // }
    // const order = this.orders[index];
    // this.orders[index] = {
    //   ...order,
    //   ...changes
    // }
    // return this.orders[index];

    const order = await this.findOne(id);
    const res = order.update(changes);
    return res;
  }

  async delete(id) {
    // const index = this.orders.findIndex(item => item.id = id);
    // if(index === -1) {
    //   throw boom.notFound('Order not found');
    // }
    // this.orders.splice(index, 1);
    // return { id };

    const order = await this.findOne(id);
    order.destroy();
    return { id };
  }

}

module.exports = OrdersService;
