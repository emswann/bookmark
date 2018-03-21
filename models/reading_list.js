module.exports = (sequelize, DataTypes) => {
  var Reading_List = sequelize.define('Reading_List', {
  },
  {
    freezeTableName: true
  });

  Reading_List.associate = models => { 
    Reading_List.belongsTo(models.User, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });

    Reading_List.belongsTo(models.Category, {
      defaultValue: 1,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });

    Reading_List.belongsTo(models.Status, {
      defaultValue: 1,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });

    Reading_List.belongsTo(models.Library, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Reading_List;
};