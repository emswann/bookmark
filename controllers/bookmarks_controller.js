const db = require("../models");
const path = require("path");
const env = require('dotenv').config();
let gbooks = require('@datafire/google_books').create({
  access_token: "",
  refresh_token: "",
  client_id: "",
  client_secret: "",
  redirect_uri: ""
});

var getGBooks = (res, searchType, searchParam) => {
  try {
    const apiKey = process.env.GBOOKS_API_KEY;
    const MAX_RESULTS = 2;
      
    if (apiKey) {
      gbooks.volumes.list({
        "q": searchParam,
        "printType": "books",
        "maxResults": MAX_RESULTS,
        "orderBy":    "newest",
        "key" : apiKey
      })
      .then(data => {
        var booksObjArray = [];
        var books = data.items;
        
        books.forEach(book =>
          booksObjArray.push({
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors,
            year: book.volumeInfo.publishedDate,
            desc: book.volumeInfo.description,
            img: book.volumeInfo.imageLinks.smallThumbnail
          })
        );
          
        res.render("usersearch", {books: booksObjArray});
      })
      .catch(error => {
        console.log(error);
      });
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
  app.get("/", ((req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  }));

  app.get("/search", ((req, res) => {
    res.render("usersearch", {});
  }));

  app.get("/api/search/title/:title", (req, res) => 
    getGBooks(res, "intitle", req.params.title));

  app.get("/api/search/author/:author", (req, res) => 
    getGBooks(res, "inauthor", req.params.author));

  app.get("/api/search/subject/:subject", (req, res) => 
    getGBooks(res, "subject", req.params.subject));
};
