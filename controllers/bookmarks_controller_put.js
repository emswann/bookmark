const db = require('../models');
const Sequelize = require('sequelize');

module.exports = app => {
  app.put("/api/list/update/status/:id", (req, res) => {
    const userId = req.params.id;

    db.Status.findAll({
      where: { name: req.body.status },
      attributes: ['id'],
      limit: 1
    })
    .then(status => {
      db.Reading_List.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: { UserId: userId },
        include: {
          model: db.Library,
          where: { title: req.body.title, author: req.body.author },
          attributes: []
        },
        limit: 1
      })
      .then(list =>  {
        var readingListObj = { 
          StatusId: status[0].id 
        };

        db.Reading_List.update(readingListObj, {
          where: { id: list[0].id }
        })
        .then(result => {
          var formatResult = { result: result[0] };
          if (!result[0]) {
            formatResult['error'] = 'No rows updated';
          }
          
          res.json(formatResult);
        });
      });
    })
    .catch(error => console.log(error));
  });

  app.put("/api/list/update/category/:id", (req, res) => {
    const userId = req.params.id;

    db.Category.findAll({
      where: { name: req.body.category },
      attributes: ['id'],
      limit: 1
    })
    .then(status => {
      db.Reading_List.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: { UserId: userId },
        include: {
          model: db.Library,
          where: { title: req.body.title, author: req.body.author },
          attributes: []
        },
        limit: 1
      })
      .then(list =>  {
        var readingListObj = { 
          StatusId: category[0].id 
        };

        db.Reading_List.update(readingListObj, {
          where: { id: list[0].id }
        })
        .then(result => {
          var formatResult = { result: result[0] };
          if (!result[0]) {
            formatResult['error'] = 'No rows updated';
          }
          
          res.json(formatResult);
        });
      });
    })
    .catch(error => console.log(error));
  });
};