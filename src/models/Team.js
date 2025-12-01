const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Team = sequelize.define('Team', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flag_url: {
      type: DataTypes.STRING
    },
    coach: {
      type: DataTypes.STRING
    },
    group: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['A', 'B', 'C', 'D', 'E', 'F']]
      }
    }
  });

  Team.associate = (models) => {
    Team.hasMany(models.Player, { foreignKey: 'team_id', as: 'players' });
    Team.hasMany(models.Match, { foreignKey: 'team_home_id', as: 'homeMatches' });
    Team.hasMany(models.Match, { foreignKey: 'team_away_id', as: 'awayMatches' });
  };

  return Team;
};
