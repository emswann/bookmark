module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  },
  {
    freezeTableName: true
  });

  Category.associate = models =>
    Category.hasMany(models.Reading_List, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

  return Category;
};