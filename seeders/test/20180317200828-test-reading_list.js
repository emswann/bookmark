'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reading_List', [{
        UserId: 1,
        LibraryId: 1,
        CategoryId: 1,
        StatusId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 1,
        LibraryId: 2,
        CategoryId: 1,
        StatusId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 1,
        LibraryId: 3,
        CategoryId: 2,
        StatusId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 1,
        LibraryId: 4,
        CategoryId: 3,
        StatusId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 1,
        LibraryId: 5,
        CategoryId: 4,
        StatusId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reading_List', [{UserId: 1}], {});
  }
};