'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Category', [{
        name: 'Not Assigned',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: 'Vacation',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Work',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: 'School',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: 'Bathroom',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: 'Easy',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: 'Hard',
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Category', null, {});
  }
};