'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('library',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        author: {
          type: Sequelize.STRING,
          allowNull: true
        },
        genre: {
          type: Sequelize.STRING,
          allowNull: true
        },
        img: {
          type: Sequelize.STRING(510),
          allowNull: true
        },
        url: {
          type: Sequelize.STRING(510),
          allowNull: true
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      }
  )},

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('library')
  }
};
