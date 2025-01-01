'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      DoctorInfo.belongsTo(models.User, {foreignKey: 'doctorId'})
      DoctorInfo.belongsTo(models.Allcode, {foreignKey: 'priceId',targetKey: 'keyMap', as: 'priceData'})
      DoctorInfo.belongsTo(models.Allcode, {foreignKey: 'provinceId',targetKey: 'keyMap', as: 'provinceData'})
      DoctorInfo.belongsTo(models.Allcode, {foreignKey: 'paymentId',targetKey: 'keyMap', as: 'paymentData'})
      DoctorInfo.belongsTo(models.Specialty, {foreignKey: 'specialtyId',targetKey: 'id', as: 'specialtyData'})
    }
  }
  DoctorInfo.init({
    doctorId: DataTypes.INTEGER,
    priceId: DataTypes.STRING,
    specialtyId: DataTypes.STRING,
    clinicId: DataTypes.STRING,
    provinceId: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    addressClinic: DataTypes.STRING,
    nameClinic: DataTypes.STRING,
    note: DataTypes.STRING,
    count: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'DoctorInfo',
    freezeTableName: true
  });
  return DoctorInfo;
};