const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {
  get status(){
    if (this.stock> 0){
      return 'available'
    }else{
      return 'unavailable'
    }
  }
 }

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
    stock: {
      type: DataTypes.INTEGER
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