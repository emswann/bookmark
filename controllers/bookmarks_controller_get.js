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
const searchList = require('./searchList');

var getGBooks = (res, searchType, searchParam) => {
  const apiKey = process.env.GBOOKS_API_KEY;
  const MAX_RESULTS = 10;

  try { 
    var searchTypeAndParam = searchType+":"+ searchParam.replace(/ /g, "%20");
    if (apiKey) {
      gbooks.volumes.list({
        "q": searchTypeAndParam,
        "printType": "books",
        "maxResults": MAX_RESULTS,
        "orderBy":    "relevance",
        "key" : apiKey
      })
      .then(data => {
        var booksObjArray = [];
        var books = data.items || [];
        
        books.forEach(book => {
          var info = book.volumeInfo;
          booksObjArray.push({
            title: info.title || "undefined",
            author: info.authors || "undefined",
            year: info.publishedDate || "undefined",
            genre: () => {
              if (info.categories) {
                return info.categories[0] || "undefined"
              }
               else {
                return "undefined";
              }
            },
            desc: info.description || "undefined",
            img: () => {
              if (info.imageLinks) {
                return info.imageLinks.smallThumbnail || "undefined"
              }
              else {
                return "undefined";
              }
            },
            url: info.infoLink || "undefined"
          })
        });
         // Including extension since using both handlebars and ejs in app. 
        res.render("usersearch.handlebars", {books: booksObjArray, layout: false});
      })
      .catch(error => console.log("gbooks.then error =", error));
    } 
    else {
      throw Error("Unable to process Google Books search - no API key.");
    }
  }
  catch(error) {
    console.log("getGBooks error =", error);
  }  
};

module.exports = app => {
  app.get("/search", ((req, res) => 
    res.sendFile(path.join(__dirname, "../public/usersearch.html"))
  ));

  app.get("/list", ((req, res) => 
    res.sendFile(path.join(__dirname, "../public/userlist.html"))
  ));

  app.get("/api/search/title/:title", (req, res) => {
    getGBooks(res, "intitle", req.params.title)
  })

  app.get("/api/search/author/:author", (req, res) => {
    getGBooks(res, "inauthor", req.params.author);
  })

  app.get("/api/search/subject/:subject", (req, res) => {
    getGBooks(res, "subject", req.params.subject);
  })

  // "Category" dropdown list population
  app.get("/api/list/:id/category", (req, res) => {
    db.Reading_List.aggregate('categoryId', 'DISTINCT', {
      plain: false,
      where: { UserId: req.params.id },
      include: [{
        model: db.Status,
        where: { name: 'Deleted' },
        attributes: { exclude: ['id', 'name', 'createdAt', 'updatedAt'] }
      },
      {
        model: db.Category,
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      }]
    })
    .then(data =>  {
      var categoryNames = [];
      data.forEach(ele => categoryNames.push(ele["Category.name"]));
      res.json(categoryNames);
    })
    .catch(error => console.log(error));
  });
  
  // "Status" dropdown list population
  app.get("/api/list/:id/status", (req, res) => {
    db.Reading_List.aggregate('statusId', 'DISTINCT', {
      plain: false,
      where: { UserId: req.params.id },
      include: {
        model: db.Status,
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      }
    })
    .then(data =>  {
      var statusNames = [];
      data.forEach(ele => statusNames.push(ele["Status.name"]));
      res.json(statusNames);
    })
    .catch(error => console.log(error));
  });

  app.get("/api/list/:id/:searchParam/:searchParamVal?", (req, res) => {
    const userId = req.params.id;
    const searchParam = req.params.searchParam;
    const searchParamVal = 
      searchParam === 'all' ? undefined : req.params.searchParamVal;

    searchList[searchParam](userId, searchParamVal)
    .then(data =>  {
      var booksObjArray = [];
        
      data.forEach(book =>
        booksObjArray.push({
          title: book.Library.title,
          author: book.Library.author,
          genre: book.Library.genre,
          category: book.Category.name,
          status: book.Status.name,
          img: book.Library.img,
          url: book.Library.url
        })
      );

      // Include extension since using both handlebars and ejs in app.   
      res.render("userlist.handlebars", {books: booksObjArray, layout: false});
    })
    .catch(error => console.log(error));
  });
};
