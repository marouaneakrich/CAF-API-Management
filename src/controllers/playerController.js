const { Player, Team } = require("../models");

//get all players
exports.getAllPlayers = async (req, res) => {
 try{
  const page = parseInt (req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page -1) * limit;
  const {count, rows} = await Player.findAndCountAll({
    limit,
    offset,
    attributes: ["id", "name", "position", "number", "age", "team_id"],
    include:[
      {
        model: Team,
        as: 'team',
        attributes: ["id", "name", "country"],
      },
    ],
  });
  res.status(200).json({
    success: true,
    message: "Players retrieved successfully",
    data: rows,
    pagination:{
      total: count,
      page,
      limit,
      pages: Math.ceil(count / limit),
    },
  });
 } catch (error) {
  res.status(500).json({
    success: false,
    message :"Error retrieving players",
    error: error.message
  });
 }
};

//get players by team
exports.getPlayersByTeam = async (req, res) => {
  res.status(200).json({ message: "Get players by team" });
};

//get player by id
exports.getPlayerById = async (res, rep) => {
  res.status(200).json({ message: "Get player by ID" });
};

//Create player
exports.createPlayer = async (req, res) => {
  res.status(200).json({ message: "Create Player" });
};

//upfate player
exports.updatePlayer = async (req, res) => {
  res.status(200).json({ message: "Update player" });
};

//delete player
exports.deletePlayer = async (req, res) => {
  res.status(200).json({ message: "Delete player" });
};
