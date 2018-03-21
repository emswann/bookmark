'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Library', [{
        title: 'Weaveworld',
        author: 'Clive Barker',
        genre: 'Fantasy/Horror',
        url: 'http://via.placeholder.com/300?text=Placeholder.com+rocks!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Necronomicon',
        author: 'Abdul Alhazred',
        genre: 'Self-Help',
        url: 'http://via.placeholder.com/300?text=Placeholder.com+rocks!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Holy Bible',
        author: 'Man',
        genre: 'Fiction',
        url: 'http://via.placeholder.com/300?text=Placeholder.com+rocks!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Gaia: A New Look at Life on Earth',
        author: 'J.E. Lovelock',
        genre: 'Earth Science',
        url: 'http://via.placeholder.com/300?text=Placeholder.com+rocks!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "The New York City Cab Driver's Joke Book",
        author: 'Jim Pietsch',
        genre: 'Humor',
        url: 'http://via.placeholder.com/300?text=Placeholder.com+rocks!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'World War Z',
        author: 'Max Brooks',
        genre: 'Fiction',
        url: 'http://via.placeholder.com/300?text=Placeholder.com+rocks!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        genre: 'Science',
        url: 'http://via.placeholder.com/300?text=Placeholder.com+rocks!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Long, Dark Tea Time of the Soul',
        author: 'Douglas Adams',
        genre: 'Fiction',
        url: 'http://via.placeholder.com/300?text=Placeholder.com+rocks!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Gray's Anatomy",
        author: 'Dr. Henry Gray',
        genre: 'Biology',
        url: 'http://via.placeholder.com/300?text=Placeholder.com+rocks!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'House of Leaves',
        author: 'Mark Z. Danielewski',
        genre: 'Fiction',
        url: 'http://via.placeholder.com/300?text=Placeholder.com+rocks!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'If Chins Could Kill',
        author: 'Bruce Campbell',
        genre: 'Autobiography',
        url: 'http://via.placeholder.com/300?text=Placeholder.com+rocks!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Neil Gaiman',
        author: 'Anansi Boys',
        genre: 'Fiction',
        url: 'http://via.placeholder.com/300?text=Placeholder.com+rocks!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Book of Swords',
        author: 'Hank Reinhardt',
        genre: 'History',
        url: 'http://via.placeholder.com/300?text=Placeholder.com+rocks!',
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