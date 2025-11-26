const Match = require("../models/Match");
const Team = require("../models/Team");
const { Op } = require("sequelize");

const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: "homeTeam" },
        { model: Team, as: "awayTeam" },
      ],
    });

    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUpcomingMatches = async (req, res) => {
  try {
    const matches = await Match.findAll({
      where: {
        match_date: { [Op.gte]: new Date() },
      },
      include: [
        { model: Team, as: "homeTeam" },
        { model: Team, as: "awayTeam" },
      ],
      order: [["match_date", "ASC"]],
    });

    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMatchById = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id, {
      include: [
        { model: Team, as: "homeTeam" },
        { model: Team, as: "awayTeam" },
      ],
    });

    if (!match) return res.status(404).json({ message: "Match not found" });

    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMatch = async (req, res) => {
  try {
    const newMatch = await Match.create(req.body);
    res.status(201).json(newMatch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMatch = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);

    if (!match) return res.status(404).json({ message: "Match not found" });

    await match.update(req.body);
    res.json({ message: "Match updated", match });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);

    if (!match) return res.status(404).json({ message: "Match not found" });

    await match.destroy();
    res.json({ message: "Match deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMatches,
  getUpcomingMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
};
