const db = require('../models');
const Sequelize = require('sequelize');

module.exports = app => {

  app.delete("/api/list/delete/:id", (req, res) => {
    const Op = Sequelize.Op;
    const userId = req.params.id;
    db.Library.findAll({ 
      where: {
        title: req.body.title,
        author: req.body.author
      },  
      limit: 1
    }).spread((result, metadata) => {
      var libraryId = result.dataValues.id;
      db.Reading_List.destroy({
        where: {
          userId: userId,
          libraryId : libraryId
        }
      })
      .then(result => {
        res.json(result);
      })
    })
    .catch(error => console.log(error));
  })
};
