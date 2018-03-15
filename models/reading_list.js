module.exports = (sequelize, DataTypes) => {
  var Reading_List = sequelize.define('Reading_List', {
  },
  {
    freezeTableName: true
  });

  Reading_List.associate = models =>
    Reading_List.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

  Reading_List.associate = models =>
    Reading_List.belongsTo(models.Library, {
      foreignKey: {
        allowNull: false
      }
    });

  Reading_List.associate = models =>
    Reading_List.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });

  Reading_List.associate = models =>
    Reading_List.belongsTo(models.Status, {
      foreignKey: {
        allowNull: false
      }
    });

  return Reading_List;
};