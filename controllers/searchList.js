const db = require('../models');
const Sequelize = require('sequelize');

module.exports = {
  all: (userId, statusId, searchParamVal) => 
    db.ReadingList.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: { UserId: userId, StatusId: statusId }
    })
    .then(data => data),

  category: (userId, statusId, searchParamVal) =>
    db.ReadingList.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { UserId: userId, StatusId: statusId },
      include: {
        model: db.Category,
        where: { name: searchParamVal },
        attributes: ['name']
      }
    }).then(data => data),

  status: (userId, statusId, searchParamVal) =>
    db.ReadingList.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { UserId: userId }, // do not exclude deleted status
      include: {
        model: db.Status,
        where: { name: searchParamVal },
        attributes: ['name']
      }
    }).then(data => data),

  author: (userId, statusId, searchParamVal) =>
    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { UserId: userId, StatusId: DEL_STATUS_ID },
      include: {
        model: db.Library,
        where: { author: searchParamVal },
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      }
    }).then(data => data),

  subject: (userId, statusId, searchParamVal) =>
    db.Reading_List.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { UserId: userId, StatusId: DEL_STATUS_ID },
      include: {
        model: db.Library,
        where: { subject: searchParamVal },
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      }
    }).then(data => data)
};