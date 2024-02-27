const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Client = require('./Client')
const Order = require('./Order')

class Basket extends Model {}

Basket.init(
  {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
  }
);

module.exports = Basket;