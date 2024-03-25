const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Fav extends Model { }

Fav.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
},{
    sequelize, 
});
  
module.exports = Fav;