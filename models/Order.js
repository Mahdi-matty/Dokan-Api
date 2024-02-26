const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Order extends Model { }

Order.init({
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
},{
    sequelize, 
});
  
module.exports = Order;