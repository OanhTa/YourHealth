'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Users', [{
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          address: '123 Main St, Anytown, USA',
          gender: 1, // true for male, false for female
          roleId: 'R1',
          phonenumber: '123-456-7890',
          positionId: 'doctor',
          image: 'https://example.com/images/john_doe.jpg'
      }, {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          password: 'password456',
          address: '456 Elm St, Anytown, USA',
          gender: 0, // true for male, false for female
          roleId: 'R2',
          phonenumber: '987-654-3210',
          positionId: 'professor',
          image: 'https://example.com/images/jane_smith.jpg'
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
