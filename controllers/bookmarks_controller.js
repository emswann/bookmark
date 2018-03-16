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

var getGBooks = (searchType, searchParam) => {
  try {
    const apiKey = process.env.GBOOKS_API_KEY;
    const MAX_RESULTS = 10;

    const qStr = "+" + searchType + ":" + searchParam.replace(/ /g,'%');
    console.log("Search string: " + qStr);
      
    if (apiKey) {
      gbooks.volumes.list({
        "q": qStr,
        "key" : apiKey,
        "printType": "books",
        "maxResults": MAX_RESULTS,
        "orderBy":    "relevance"
      })
      .then(data => {
        console.log(data);
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
    res.sendFile(path.join(__dirname, "../public/usersearch.html"));
  }));

  app.get("/api/search/title/:title", (req, res) => 
    getGBooks("intitle", req.params.title));

  app.get("/api/search/author/:author", (req, res) => 
    getGBooks("inauthor", req.params.author));

  app.get("/api/search/subject/:subject", (req, res) => 
    getGBooks("subject", req.params.subject));
};
