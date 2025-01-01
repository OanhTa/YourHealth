'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Specialty.hasMany(models.DoctorInfo, {foreignKey: 'specialtyId' , as: 'specialtyData'})
    }
  }
  Specialty.init({
    name: DataTypes.STRING,
    descriptionHTML: DataTypes.STRING,
    descriptionMarkdown: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Specialty',
    freezeTableName: true
  });
  return Specialty;
};