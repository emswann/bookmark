'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Status', [{
        name: 'Not Started',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: 'In Progress',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: 'Completed',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: 'Deleted',
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Status', null, {});
  }
};