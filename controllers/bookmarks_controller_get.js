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
    console.log("title search received =", req.params);
    getGBooks(res, "intitle", req.params.title)
  })

  app.get("/api/search/author/:author", (req, res) => {
    console.log("author search received =", req.params);
    getGBooks(res, "inauthor", req.params.author);
  })

  app.get("/api/search/subject/:subject", (req, res) => {
    console.log("subject search received =", req.params);
    getGBooks(res, "subject", req.params.subject);
  })

  // "Category" dropdown list population
  app.get("/api/list/:id/category", (req, res) => {
    const Op = Sequelize.Op;
    const userId = req.params.id;
    const DEL_STATUS_ID = 4;
    console.log("Category GET received req =", req.params);
    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: [{ CategoryId: { [Op.ne]: DEL_STATUS_ID } }]
    })
    .then(data =>  {
      var usedCategories = [];
      data.forEach(function(ele) {
        if (!usedCategories.includes(ele.CategoryId)) {
          usedCategories.push(ele.CategoryId)
        }
      });
      db.Category.findAll({
        where: {
          id: {
            [Op.or]: usedCategories
          }
        }
      }).then(data => {
        var categoryNames = [];
        data.forEach(ele => categoryNames.push(ele.name));
        console.log("categoryNames about to be sent back =", categoryNames);
        res.json(categoryNames);
      })
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
  });
  
  // "Status" dropdown list population
  app.get("/api/list/:id/status", (req, res) => {
    const Op = Sequelize.Op;
    const userId = req.params.id;
    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
    .then(data =>  {
      var usedStatuses = [];
      data.forEach(function(ele) {
        if (!usedStatuses.includes(ele.StatusId)) {
          usedStatuses.push(ele.StatusId)
        }
      });
      db.Status.findAll({
        where: {
          id: {
            [Op.or]: usedStatuses
          }
        }
      }).then(data => {
        var statusNames = [];
        data.forEach(ele => statusNames.push(ele.name));
        res.json(statusNames);
      })
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
  });

  app.get("/api/list/:id/:searchParam/:searchParamVal?", (req, res) => {
    const Op = Sequelize.Op;
    const userId = req.params.id;
    const searchParam = req.params.searchParam;
    const searchParamVal = 
      searchParam === 'all' ? undefined : req.params.searchParamVal;
    const DEL_STATUS_ID = 4;

    searchList[searchParam](userId, DEL_STATUS_ID, searchParamVal)
    .then(data =>  {
      var booksObjArray = [];
        
      data.forEach(book =>
        booksObjArray.push({
          title: book.Library.title,
          author: book.Library.author,
          genre: book.Library.genre,
          category: book.Category.name,
          status: book.Status.name,
          url: book.Library.url
        })
      );

      // Include extension since using both handlebars and ejs in app.   
      res.render("userlist.handlebars", {books: booksObjArray, layout: false});
    })
    .catch(error => console.log(error));
  });
};
