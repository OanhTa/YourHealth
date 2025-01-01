'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {

    static associate(models) {
      
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