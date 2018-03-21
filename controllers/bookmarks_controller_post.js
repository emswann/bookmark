const db = require('../models');
const Sequelize = require('sequelize');

module.exports = app => {
  app.post("/api/list/add", (req, res) => {
    console.log(req.body);
  });
};
