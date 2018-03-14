'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ref_Status', [{
        name: 'Not Started'
      }, {
        name: 'In Progress'
      }, {
        name: 'Completed'
      }, {
        name: 'Deleted'
      }]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ref_Status', null, {});
  }
};
