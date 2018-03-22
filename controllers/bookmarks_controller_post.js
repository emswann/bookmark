const db = require('../models');
const Sequelize = require('sequelize');

module.exports = app => {
  app.post("/api/list/add", (req, res) => {
    const Op = Sequelize.Op;

    var libraryObj = {
      title:  req.body.title,
      author: req.body.author,
      genre:  req.body.genre,
      url:    req.body.url         
    };

    db.Library.findOrCreate({ where: libraryObj })
    .spread((book, created) => {
      var libraryId = book.dataValues.id;
      db.Reading_List.findAndCountAll({
        attributes: ['id'],
        where: {
          userId: {
            [Op.eq]: req.body.userId
          },
          libraryId: {
            [Op.eq]: libraryId
          },
        },
        limit: 1
      })
      .then(result => {
        if (result.count) {
          res.json({ message: "Record exists" });
        }
        else {
          var readingListObj = {
            UserId: parseInt(req.body.userId),
            LibraryId: book.dataValues.id
          }

          db.Reading_List.create(readingListObj)
          .then(result => {
            res.json(result);
          })
        }
      });
    })
    .catch(error => console.log(errro));
  });
};