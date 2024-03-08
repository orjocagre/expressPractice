const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./../models/user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    field: 'last_name'
  },
  phone: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    allowNull: false,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Customer extends Model {

  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
