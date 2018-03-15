module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    login_attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: true
      }
    }
  },
  {
    freezeTableName: true
  });

  User.associate = models =>
    User.hasMany(models.Reading_List, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

  return User;
};
