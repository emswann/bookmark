'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        productId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'products',
            key: 'id'
          },
          allowNull: false
        },
        orderId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'orders',
            key: 'id'
          },
          allowNull: false
        }
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }
  )},

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user')
  }
};

migrations/model1.js
model2Id: {
  type: Sequelize.INTEGER,
  references: {
    model: 'model2',
    key: 'id'
  },
},
