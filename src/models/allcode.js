'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Allcode.hasMany(models.User, {foreignKey: 'positionId', as: 'positionData'})
      Allcode.hasMany(models.User, {foreignKey: 'gender', as: 'genderData'})
      Allcode.hasMany(models.Schedule, {foreignKey: 'timeType' , as: 'timeTypeData'})

      Allcode.hasMany(models.DoctorInfo, {foreignKey: 'priceId' , as: 'priceData'})
      Allcode.hasMany(models.DoctorInfo, {foreignKey: 'provinceId' , as: 'provinceData'})
      Allcode.hasMany(models.DoctorInfo, {foreignKey: 'paymentId' , as: 'paymentData'})
    
    }
  }
  Allcode.init({
    keyMap: DataTypes.STRING,//role, status, time
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};