'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Markdown', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contentHTML: {
        type: Sequelize.TEXT('long')
      },
      contentMarkdown: {
        type: Sequelize.TEXT('long')
      },
      description: {
        type: Sequelize.TEXT('long')
      },
      doctorId: {
        allowNull:true,
        type: Sequelize.INTEGER
      },
      clinicId: {
        allowNull:true,
        type: Sequelize.INTEGER
      },
      specialtyId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Markdown');
  }
};