const db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  all: (userId, searchParamVal) => 
    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { UserId: userId },
      include: [{
        model: db.Library,
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      },
      {
        model: db.Category,
        attributes: ['name']
      }, 
      {
        model: db.Status,
        attributes: ['name'],
        where: { name: { [Op.ne]: 'Deleted' }}
      }]     
    })
    .then(data => data),

  category: (userId, searchParamVal) =>
    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { UserId: userId },
      include: [{
        model: db.Library,
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      },
      {
        model: db.Category,
        where: { name: searchParamVal },
        attributes: ['name']
      }, 
      {
        model: db.Status,
        attributes: ['name'],
        where: { name: { [Op.ne]: 'Deleted' }}
      }] 
    }).then(data => data),

  status: (userId, searchParamVal) => 
    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { UserId: userId },
      include: [{
        model: db.Library,
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      },
      {
        model: db.Category,
        attributes: ['name']
      }, 
      {
        model: db.Status,
        where: { name: searchParamVal },
        attributes: ['name']
      }] 
    }).then(data => data),

  author: (userId, searchParamVal) =>
    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { UserId: userId },
      include: [{
        model: db.Library,
        where:  
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('author')),
          {
            [Op.like]: Sequelize.fn('lower', 
                        '%' + searchParamVal.replace(/ /g, '%') + '%')
          }),
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      },
      {
        model: db.Category,
        attributes: ['name']
      }, 
      {
        model: db.Status,
        attributes: ['name'],
        where: { name: { [Op.ne]: 'Deleted' }}
      }] 
    }).then(data => data),

  title: (userId, searchParamVal) => 
    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { UserId: userId },
      include: [{
        model: db.Library,
        where:  
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('title')),
          {
            [Op.like]: Sequelize.fn('lower', 
                        '%' + searchParamVal.replace(/ /g, '%') + '%')
          }),
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      },
      {
        model: db.Category,
        attributes: ['name']
      }, 
      {
        model: db.Status,
        attributes: ['name'],
        where: { name: { [Op.ne]: 'Deleted' }}
      }] 
    }).then(data => data)
};