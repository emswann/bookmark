const db = require('../models');
const Sequelize = require('sequelize');

module.exports = app => {
  app.put("/api/list/update", (req, res) => {
    const Op = Sequelize.Op;

    db.Status.findAll({
      where: { name: req.body.status },
      attributes: ['id']
    })
    .then(status => {
      db.Reading_List.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: { UserId: req.body.userId },
        include: {
          model: db.Library,
          where: { title: req.body.title, author: req.body.author },
          attributes: []
        }
      })
      .then(list =>  {
        var dataObj = { 
          StatusId: status[0].id 
        };

        db.Reading_List.update(dataObj, {
          where: { id: list[0].id }
        })
        .then(result => {
                    // result[0] = 0;
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