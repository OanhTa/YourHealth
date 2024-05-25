'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    roleId: DataTypes.STRING,//R1, R2, R3
    phonenumber: DataTypes.STRING,
    positionId: DataTypes.STRING,//doctor, professor
    image: DataTypes.STRING//link , src
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};