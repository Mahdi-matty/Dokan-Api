const bcrypt = require('bcryptjs');
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Merchant extends Model { }

Merchant.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    hooks: {
      beforeCreate: newUserData => {
        newUserData.password = bcrypt.hashSync(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
  }
);

module.exports = Merchant;