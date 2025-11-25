const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Match = sequelize.define('Match', {
    team_home_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    team_away_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    score_home: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    score_away: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    match_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    stadium: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('scheduled', 'live', 'finished'),
      defaultValue: 'scheduled'
    }
  });

  Match.associate = (models) => {
    Match.belongsTo(models.Team, { foreignKey: 'team_home_id', as: 'homeTeam' });
    Match.belongsTo(models.Team, { foreignKey: 'team_away_id', as: 'awayTeam' });
  };

  return Match;
};