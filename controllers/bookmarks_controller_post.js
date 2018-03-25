const db = require('../models');
const Sequelize = require('sequelize');

module.exports = app => {
  app.post("/api/list/add/:id", (req, res) => {
    const Op = Sequelize.Op;
    const userId = req.params.id;

    db.Library.findOrCreate({ where: req.body })
    .spread((book, created) => {
      var libraryId = book.dataValues.id;
      db.Reading_List.findAndCountAll({
        attributes: ['id'],
        where: {
          userId: {
            [Op.eq]: userId
          },
          libraryId: {
            [Op.eq]: libraryId
          },
        },
        limit: 1
      })
      .then(result => {
        if (result.count) {
          res.json({ error: "Record exists" });
        }
        else {
          var readingListObj = {
            UserId: parseInt(userId),
            LibraryId: book.dataValues.id
          }

          db.Reading_List.create(readingListObj)
          .then(result => {
            res.json(result);
          })
        }
      });
    })
    .catch(error => console.log(error));
  });
};