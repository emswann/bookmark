module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
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

  User.associate = models => User.hasMany(models.Reading_List);

  User.generateHash = password => 
    bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

  User.validPassword = (password, this_password) =>
    bcrypt.compareSync(password, this_password);

  return User;
};
