module.exports = (sequelize, DataTypes) => {
  var Reading_List = sequelize.define('Reading_List', {
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
    Reading_List.belongsTo(models.Ref_Category, {
      foreignKey: {
        allowNull: false
      }
    });

  Reading_List.associate = models =>
    Reading_List.belongsTo(models.Ref_Status, {
      foreignKey: {
        allowNull: false
      }
    });

  return Reading_List;
};