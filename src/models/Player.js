const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Player = sequelize.define('Player', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 99
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: 16,
        max: 45
      }
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Player.associate = (models) => {
    Player.belongsTo(models.Team, { foreignKey: 'team_id', as: 'team' });
  };

  return Player;
};