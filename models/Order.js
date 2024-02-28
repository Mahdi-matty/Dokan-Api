const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const Product = require('./Product')
const Basket = require('./Basket')

class Order extends Model { }

Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
},{
    sequelize, 
});
  
module.exports = Order;