'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [{
        email: 'test2@hotmail.com',
        password: '$2a$04$Nzdjwz14SbQvx83WDWvzSO2slo9PbkmZI8Yj7qScb7JhFiTx3spTe',
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', [{email: 'test2@hotmail.com'}], {});
  }
};