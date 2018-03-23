const db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  all: (userId, statusId, searchParamVal) => 
    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { UserId: userId, StatusId: { [Op.ne]: statusId }},
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
        attributes: ['name']
      }]     
    })
    .then(data => data),

  category: (userId, statusId, searchParamVal) =>
    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { UserId: userId, StatusId: { [Op.ne]: statusId }},
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
        attributes: ['name']
      }] 
    }).then(data => data),

  status: (userId, statusId, searchParamVal) => 
    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { UserId: userId }, // do not exclude deleted status
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

  author: (userId, statusId, searchParamVal) =>
    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { UserId: userId, StatusId: { [Op.ne]: statusId }},
      include: [{
        model: db.Library,
        where: { author: searchParamVal },
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      },
      {
        model: db.Category,
        attributes: ['name']
      }, 
      {
        model: db.Status,
        attributes: ['name']
      }] 
    }).then(data => data),

  title: (userId, statusId, searchParamVal) =>
    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { UserId: userId, StatusId: { [Op.ne]: statusId }},
      include: [{
        model: db.Library,
        where: { title: searchParamVal },
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      },
      {
        model: db.Category,
        attributes: ['name']
      }, 
      {
        model: db.Status,
        attributes: ['name']
      }] 
    }).then(data => data)
};