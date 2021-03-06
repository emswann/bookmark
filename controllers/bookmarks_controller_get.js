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
const Op = Sequelize.Op;
const searchList = require('./searchList');

var getGBooks = (res, userId, searchType, searchParam) => {
  const apiKey = process.env.GBOOKS_API_KEY;
  const MAX_RESULTS = 20;
  const RET_RESULTS = 10;

  try { 
    var searchTypeAndParam = searchType + ":" + searchParam;
    if (apiKey) {
      gbooks.volumes.list({
        "q": searchTypeAndParam,
        "printType": "books",
        "maxResults": MAX_RESULTS,
        "orderBy":    "relevance",
        "key" : apiKey
      })
      .then(data => {
        var gBooks = data.items || [];
        var gBooksObjArray = [];

        gBooks.forEach(book => {
          var info = book.volumeInfo;
          var author = info.authors ? info.authors.toString() : undefined;

          gBooksObjArray.push({
            title: info.title,
            // Need actual string to insert into table due to subsequent searches by author.
            author: author,
            mod_author: author || "Unknown",
            year: info.publishedDate,
            genre: info.categories ? info.categories.toString() : undefined,
            desc: info.description,
            img: info.imageLinks ? info.imageLinks.smallThumbnail : undefined,
            url: info.infoLink
          })
        });

        searchList["all"](userId, undefined)
        .then(data =>  {
          var userBooks = data;
          var userBooksObjArray = [];
        
          userBooks.forEach(book =>
            userBooksObjArray.push({
              title: book.Library.title,
              author: book.Library.author
            })  
          )             

          var filteredObjArray = 
            gBooksObjArray.filter(gbook =>   
              !userBooksObjArray.some(ubook => 
                // Need to compare google book using modified author since this is returned from the database.
                gbook.title === ubook.title && gbook.mod_author === ubook.author));

          // Including extension since using both handlebars and ejs in app. 
          res.render("usersearch.handlebars", {books: filteredObjArray.slice(0, RET_RESULTS), layout: false});
        });
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

  app.get("/api/search/:id/title/:title", (req, res) => {
    getGBooks(res, req.params.id, "intitle", req.params.title)
  })

  app.get("/api/search/:id/author/:author", (req, res) => {
    getGBooks(res, req.params.id, "inauthor", req.params.author);
  })

  app.get("/api/search/:id/subject/:subject", (req, res) => {
    getGBooks(res, req.params.id, "subject", req.params.subject);
  })

  // "Category" dropdown list population
  app.get("/api/list/:id/category", (req, res) => {
    db.Reading_List.aggregate('categoryId', 'DISTINCT', {
      plain: false,
      where: { UserId: req.params.id },
      include: [{
        model: db.Status,
        where: { name: { [Op.ne]: 'Deleted' }},
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
        
      data.forEach(book => {
        var mod_author = book.Library.author;

        booksObjArray.push({
          title: book.Library.title,
          author: mod_author === "Unknown" ? undefined : mod_author,
          mod_author: mod_author,
          genre: book.Library.genre,
          category: book.Category.name,
          status: book.Status.name,
          img: book.Library.img,
          url: book.Library.url
        })
      });

      // Include extension since using both handlebars and ejs in app.   
      res.render("userlist.handlebars", {books: booksObjArray, layout: false});
    })
    .catch(error => console.log(error));
  });
};
