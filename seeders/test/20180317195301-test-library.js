'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Library', [{
        title: 'Title - Test 1',
        author: 'Author - Test 1',
        genre: 'Genre - Test 1',
        url: 'https://www.youtube.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Title - Test 2',
        author: 'Author - Test 2',
        genre: 'Genre - Test 2',
        url: 'https://www.youtube.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Title - Test 3',
        author: 'Author - Test 3',
        genre: 'Genre - Test 3',
        url: 'https://www.youtube.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Title - Test 4',
        author: 'Author - Test 4',
        genre: null,
        url: 'https://www.youtube.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Title - Test 5',
        author: 'Author - Test 5',
        genre: 'Genre - Test 5',
        url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Title - Test 6',
        author: 'Author - Test 6',
        genre: 'Genre - Test 6',
        url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Library', 
                                     [{title: {[Op.like]: '%Test%'}}], {});
  }
};