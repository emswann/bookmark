module.exports = (sequelize, DataTypes) => {
  var Status = sequelize.define('Status', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    }
  },
  {
    freezeTableName: true,
    operatorsAliases: false
  });

  Status.associate = models =>
    Status.hasMany(models.Reading_List, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

  return Status;
};