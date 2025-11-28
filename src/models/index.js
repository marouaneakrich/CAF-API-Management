const sequelize = require("../config/database");
const Team = require("./Team");
const Player = require("./Player");
const Match = require("./Match");
const User = require("./User");

// Initialize models by calling them with sequelize
const TeamModel = Team(sequelize);
const PlayerModel = Player(sequelize);
const MatchModel = Match(sequelize);
const UserModel = User(sequelize);

// Set up associations
if (TeamModel.associate) {
  TeamModel.associate({
    Player: PlayerModel,
    Match: MatchModel,
    User: UserModel,
  });
}

if (PlayerModel.associate) {
  PlayerModel.associate({
    Team: TeamModel,
    Match: MatchModel,
    User: UserModel,
  });
}

if (MatchModel.associate) {
  MatchModel.associate({
    Team: TeamModel,
    Player: PlayerModel,
    User: UserModel,
  });
}

if (UserModel.associate) {
  UserModel.associate({
    Team: TeamModel,
    Player: PlayerModel,
    Match: MatchModel,
  });
}

module.exports = {
  sequelize,
  Team: TeamModel,
  Player: PlayerModel,
  Match: MatchModel,
  User: UserModel,
};
