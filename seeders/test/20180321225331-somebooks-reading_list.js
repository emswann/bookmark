'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reading_List', [{
        UserId: 2,
        LibraryId: 1,
        CategoryId: 1,
        StatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 2,
        LibraryId: 2,
        CategoryId: 2,
        StatusId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 2,
        LibraryId: 3,
        CategoryId: 4,
        StatusId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 2,
        LibraryId: 4,
        CategoryId: 2,
        StatusId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 2,
        LibraryId: 5,
        CategoryId: 3,
        StatusId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 2,
        LibraryId: 6,
        CategoryId: 4,
        StatusId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 2,
        LibraryId: 7,
        CategoryId: 1,
        StatusId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reading_List', [{UserId: 1}], {});
  }
};
