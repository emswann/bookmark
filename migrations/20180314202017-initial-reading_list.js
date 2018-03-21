'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reading_list',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        UserId: {
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          references: {
            model: 'user',
            key: 'id'
          },
          allowNull: false
        },
        LibraryId: {
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          references: {
            model: 'library',
            key: 'id'
          },
          allowNull: false
        },
        CategoryId: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          references: {
            model: 'category',
            key: 'id'
          },
          allowNull: false
        },
        StatusId: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          references: {
            model: 'status',
            key: 'id'
          },
          allowNull: false
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
    return queryInterface.dropTable('reading_list')
  }
};