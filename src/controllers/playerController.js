const { Player, Team } = require("../models");

//get all players
exports.getAllPlayers = async (req, res) => {
  res.status(200).json({ message: "Get all players" });
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
