'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {

    static associate(models) {
       Booking.belongsTo(models.User, {foreignKey: 'patientid',targetKey: 'id', as: 'patientData'})
       Booking.belongsTo(models.Allcode, {foreignKey: 'timeType',targetKey: 'keyMap', as: 'timeTypeB'})
    }
  }
  Booking.init({
    statusId: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    patientid: DataTypes.INTEGER,
    date: DataTypes.STRING,
    timeType: DataTypes.STRING,
    token:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
    freezeTableName: true
  });
  return Booking;
};