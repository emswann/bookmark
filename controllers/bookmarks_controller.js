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

var getWhereQuery = (queryTable, searchParam, searchParamVal) => {
  var whereQuery = {};

  // For category or status search matching by name.
  // For library search matching by title or author.
  if (((queryTable === 'library') 
          && (searchParam === 'title' || searchParam === 'author')) 
      || queryTable === searchParam) {
    if (queryTable === 'library') {
      column = searchParam;
    }
    else {
      column = 'name';
    }
    whereQuery[column] = searchParamVal;
  }
  console.log("whereQuery =", whereQuery);
  return(whereQuery);
}

module.exports = app => {
  // app.get("/", ((req, res) => moved to login_controller.js

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
    
    console.log("userID =", userId, "// searchParam =", searchParam, "// searchParamVal =", searchParamVal);
    var listDeleted;
    if (searchParam === "status" && searchParamVal === "Deleted") {
      listDeleted = DEL_STATUS_ID;
      console.log("filtering for Deleted list");
    } else {
      listDeleted = { [Op.ne]: DEL_STATUS_ID };
      console.log("filtering out Deleted from lists");
    }
    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: [{ UserId: userId, StatusId: listDeleted }],
      include: [{
        model: db.Library,
        where: getWhereQuery('library', searchParam, searchParamVal),
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      },
      {
        model: db.Category,
        where: getWhereQuery('category', searchParam, searchParamVal),
        attributes: ['name']
      },
      {
        model: db.Status,
        where: getWhereQuery('status', searchParam, searchParamVal),
        attributes: ['name']
      },
      {
        model: db.User,
        attributes: ['email']
      }]
    })
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

  app.post("/api/list/add", (req, res) => {
    console.log(req.body);
  });
};
