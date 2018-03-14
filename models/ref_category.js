module.exports = (sequelize, DataTypes) => {
  var Ref_Category = sequelize.define('Ref_Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  });

  Ref_Category.associate = models =>
    Ref_Category.hasMany(models.Reading_List, {
      onDelete: 'cascade'
    });

  return Ref_Category;
};