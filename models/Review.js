const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Client = require('./Client')
const Product = require('./Product')

class Review extends Model {}

Review.init(
  {
    comment : {
      type: DataTypes.JSON
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
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

module.exports = Review;