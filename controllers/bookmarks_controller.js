const db = require("../models");
const path = require("path");

module.exports = app => {
  app.get("/", ((req, res) => {
    res.sendFile(path.join(__dirname, "../public/usersearch.html"));
  }));

  app.get("/api/search/title/:title", (req, res) => {
    console.log("Title Search:");
  });

  app.get("/api/search/author/:author", (req, res) => {
    console.log("Author Search:");
  });

  app.get("/api/search/subject/:subject", (req, res) => {
    console.log("Subject Search:");
  });
};