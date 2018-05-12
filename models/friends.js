module.exports = function(sequelize, DataTypes) {
  var Friends = sequelize.define('friends', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://placem.at/things?w=250&random=some_seed',
      validate: {
        isUrl: true
      }
    },
    scores: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isComplete(value) {
          if (value.length !== 10) {
            throw new Error('There is an answer missing!');
          }
        }
      }
    }
  });

  return Friends;
};