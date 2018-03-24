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
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    img: {
      type: DataTypes.STRING(510),
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    url: {
      type: DataTypes.STRING(510),
      allowNull: true,
      validate: {
        isUrl: true
      }
    }
  },
  {
    freezeTableName: true
  });

  Library.associate = models => Library.hasMany(models.Reading_List);

  return Library;
};