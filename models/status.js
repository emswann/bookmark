module.exports = (sequelize, DataTypes) => {
  var Status = sequelize.define('Status', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    freezeTableName: true
  });

  Status.associate = models => Status.hasMany(models.Reading_List);

  return Status;
};