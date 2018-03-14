module.exports = (sequelize, DataTypes) => {
  var Ref_Status = sequelize.define('Ref_Status', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  });

  Ref_Status.associate = models =>
    Ref_Status.hasMany(models.Reading_List, {
      onDelete: 'cascade'
    });

  return Ref_Status;
};