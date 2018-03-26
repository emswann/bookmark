'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Library', [{
        title: 'Title - Test 1',
        author: 'Author - Test 1',
        genre: 'Genre - Test 1',
        img: 'https://www.asme.org/getmedia/c2c8ea5a-b690-4ba7-92bb-34bd1432862b/book_guide_hero_books.aspx',
        url: 'https://www.youtube.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Title - Test 2',
        author: 'Author - Test 2',
        genre: 'Genre - Test 2',
        img: 'https://www.asme.org/getmedia/c2c8ea5a-b690-4ba7-92bb-34bd1432862b/book_guide_hero_books.aspx',
        url: 'https://www.youtube.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Title - Test 3',
        author: 'Author - Test 3',
        genre: 'Genre - Test 3',
        img: 'https://www.asme.org/getmedia/c2c8ea5a-b690-4ba7-92bb-34bd1432862b/book_guide_hero_books.aspx',
        url: 'https://www.youtube.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Title - Test 4',
        author: 'Author - Test 4',
        genre: null,
        img: 'https://www.asme.org/getmedia/c2c8ea5a-b690-4ba7-92bb-34bd1432862b/book_guide_hero_books.aspx',
        url: 'https://www.youtube.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Title - Test 5',
        author: 'Author - Test 5',
        genre: 'Genre - Test 5',
        img: 'https://www.asme.org/getmedia/c2c8ea5a-b690-4ba7-92bb-34bd1432862b/book_guide_hero_books.aspx',
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
      },
      {
        title: 'Familiar flowers of field and garden',
        author: 'Ferdinand Schuyler Mathews',
        genre: 'Botany',
        img: 'http://books.google.com/books/content?id=PcrwAAAAMAAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        url: 'https://play.google.com/store/books/details?id=PcrwAAAAMAAJ&source=gbs_api',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Forget Me Not',
        author: 'Sarah Flowers',
        genre: null,
        img: 'http://books.google.com/books/content?id=YAdiCAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        url: 'http://books.google.com/books?id=YAdiCAAAQBAJ&dq=inauthor:flowers&hl=&as_pt=BOOKS&source=gbs_api',
        createdAt: new Date(),
        updatedAt: new Date()  
      },
      {
        title: 'The New Flower Expert',
        author: 'D. G. Hessayon',
        genre: 'Gardening',
        img: 'http://books.google.com/books/content?id=FKEiLJoYGIEC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        url: 'http://books.google.com/books?id=FKEiLJoYGIEC&dq=subject:flowers&hl=&as_pt=BOOKS&source=gbs_api',
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