const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Client = require('./Client')
const Order = require('./Order')

class Basket extends Model {}

Basket.init(
  {
    // Define foreign keys referencing the Student model
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: 'id'
      }
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: 'id'
      }
    }
  },
  {
    sequelize,
  }
);

module.exports = Basket;