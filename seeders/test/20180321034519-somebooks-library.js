'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Library', [{
        title: "Weaveworld",
        author: "Clive Barker",
        genre: "Fantasy/Horror",
        img: 'https://www.pinterest.com/pin/572942383817660709/',
        url: "https://www.whocares.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "The Necronomicon",
        author: "Abdul Alhazred",
        genre: "Self-Help",
        img: 'https://www.pinterest.com/pin/572942383817660709/',
        url: "https://www.hell.org",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "The Holy Bible",
        author: "Man",
        genre: "Fiction",
        img: 'https://www.pinterest.com/pin/572942383817660709/',
        url: "https://www.eternalsalvationoryourmoneyback.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Gaia: A New Look At Life On Earth",
        author: "J.E. Lovelock",
        genre: "Earth Science",
        img: 'https://www.pinterest.com/pin/572942383817660709/',
        url: "https://www.alivingworld.org",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "The New York City Cab Driver's Joke Book",
        author: "Jim Pietsch",
        genre: "Humor",
        img: 'https://www.pinterest.com/pin/572942383817660709/',
        url: "https://www.hahaha.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "World War Z",
        author: "Max Brooks",
        genre: "Fiction",
        img: 'https://www.pinterest.com/pin/572942383817660709/',
        url: "https://www.betterthanthemovie.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        genre: "Science",
        img: 'https://www.pinterest.com/pin/572942383817660709/',
        url: "https://www.gangsta.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "The Long, Dark Tea Time of the Soul",
        author: "Douglas Adams",
        genre: "Humor/Fiction",
        img: 'https://www.pinterest.com/pin/572942383817660709/',
        url: "https://www.holisticdriving.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Library', null, {});
  }
};