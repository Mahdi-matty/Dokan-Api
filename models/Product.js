const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model { }

Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT
    },
    status: {
        type: DataTypes.ENUM('available', 'unavailable'),
        defaultValue: 'available'
      },
      productPic: {
        type: DataTypes.STRING
      }
  },
  {
    sequelize,
  }
);
  
module.exports = Product;