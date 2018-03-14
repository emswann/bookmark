'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ref_Category', [{
        name: 'Vacation'
      }, {
        name: 'Work'
      }, {
        name: 'School'
      }, {
        name: 'Bathroom'
      }, {
        name: 'Easy'
      }, {
        name: 'Hard'
      }]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ref_Category', null, {});
  }
};