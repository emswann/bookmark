module.exports = (sequelize, DataTypes) => {
  var Library = sequelize.define('Library', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    img: {
      type: DataTypes.STRING(510),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(510),
      allowNull: true
    }
  },
  {
    freezeTableName: true
  });

  Library.associate = models => Library.hasMany(models.Reading_List);

  return Library;
};