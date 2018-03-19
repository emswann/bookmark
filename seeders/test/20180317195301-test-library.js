'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Library', [{
        title: 'Title - Test 1',
        author: 'Author - Test 1',
        genre: 'Genre - Test 1',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkNN17jupOQuoDLz8iL__JWm-grGA4ZBuCF-5BxhNqCD-QASz9hQ',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Title - Test 2',
        author: 'Author - Test 2',
        genre: 'Genre - Test 2',
        url: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Title - Test 3',
        author: 'Author - Test 3',
        genre: 'Genre - Test 3',
        url: 'http://via.placeholder.com/300?text=Placeholder.com+rocks!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Title - Test 4',
        author: 'Author - Test 4',
        genre: null,
        url: 'https://www.mountaineers.org/images/placeholder-images/placeholder-400-x-400/image_preview',
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
      }]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Library', 
                                     [{title: {[Op.like]: '%Test%'}}], {});
  }
};