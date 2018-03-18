const db = require('../models');
const path = require('path');
const env = require('dotenv').config();
let gbooks = require('@datafire/google_books').create({
  access_token: "",
  refresh_token: "",
  client_id: "",
  client_secret: "",
  redirect_uri: ""
});
const Sequelize = require('sequelize');

var getGBooks = (res, searchType, searchParam) => {
  const apiKey = process.env.GBOOKS_API_KEY;
  const MAX_RESULTS = 10;

  try { 
    if (apiKey) {
      gbooks.volumes.list({
        "q": searchParam,
        "printType": "books",
        "maxResults": MAX_RESULTS,
        "orderBy":    "relevance",
        "key" : apiKey
      })
      .then(data => {
        var booksObjArray = [];
        var books = data.items;
        
        books.forEach(book =>
          booksObjArray.push({
            title: book.volumeInfo.title || "undefined",
            author: book.volumeInfo.authors || "undefined",
            year: book.volumeInfo.publishedDate || "undefined",
            genre: () => {
              if (book.volumeInfo.categories) {
                return book.volumeInfo.categories[0] || "undefined"
              }
              else {
                return "undefined";
              }
            },
            desc: book.volumeInfo.description || "undefined",
            img: () => {
              if (book.volumeInfo.imageLinks) {
                return book.volumeInfo.imageLinks.smallThumbnail || "undefined"
              }
              else {
                return "undefined";
              }
            }
          })
        );
         
        res.render("usersearch", {books: booksObjArray, layout: false});
      })
      .catch(error => console.log(error));
    } 
    else {
      throw Error("Unable to process Google Books search - no API key.");
    }
  }
  catch(error) {
    console.log(error);
  }  
};

module.exports = app => {
  app.get("/", ((req, res) =>
    res.sendFile(path.join(__dirname, "../public/login.html"))
  ));

  app.get("/search", ((req, res) => 
    res.sendFile(path.join(__dirname, "../public/usersearch.html"))
  ));

  app.get("/list", ((req, res) => 
    res.sendFile(path.join(__dirname, "../public/userlist.html"))
  ));

  app.get("/api/search/title/:title", (req, res) => 
    getGBooks(res, "intitle", req.params.title));

  app.get("/api/search/author/:author", (req, res) => 
    getGBooks(res, "inauthor", req.params.author));

  app.get("/api/search/subject/:subject", (req, res) => 
    getGBooks(res, "subject", req.params.subject));

  app.get("/api/search/list/:id/:category?", (req, res) => {
    const Op = Sequelize.Op;
    const userId = req.params.id;
    const category = req.params.category;
    const DEL_STATUS_ID = 4;

    var categoryWhere = {};  
    if (category) {
      categoryWhere.id = category;
    }

    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: [{ UserId: userId, StatusId: { [Op.ne]: DEL_STATUS_ID } }],
      include: [{
        model: db.Library,
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      },
      {
        model: db.Category,
        where: categoryWhere,
        attributes: ['name']
      },
      {
        model: db.Status,
        attributes: ['name']
      },
      {
        model: db.User,
        attributes: ['name']
      }]
    })
    .then(data => res.json(data))
        // res.render("userlist", {books: data, layout: false});
    .catch(error => res.json(error));
  });
};
