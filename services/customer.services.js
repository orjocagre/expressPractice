const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');

class CustomersService {

  constructor() {}

  async find() {
    const res = await models.Customer.findAll({
      include: ['user']
    });
    return res;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if(!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async create(data) {

    // const newUser = await models.User.create(data.user);
    // const newCustomer = await models.Customer.create({
    //   ...data,
    //   userId: newUser.id
    // });
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const res = await customer.update(changes);
    return res;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    customer.destroy();
    return { id };
  }

}

module.exports = CustomersService;
