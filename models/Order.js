const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const Product = require('./Product')
const Basket = require('./Basket')

class Order extends Model { }

Order.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
},{
    sequelize, 
});
  
module.exports = Order;