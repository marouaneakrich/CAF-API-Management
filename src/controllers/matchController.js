const { Op } = require("sequelize");
const Match = require("../models/Match");
const Team = require("../models/Team");

// GET ALL MATCHES
const getAllMatches = async (req, res, next) => {
  try {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: "homeTeam", attributes: ["id", "name"] },
        { model: Team, as: "awayTeam", attributes: ["id", "name"] },
      ],
      order: [["match_date", "ASC"]],
    });

    res.json(matches);
  } catch (err) {
    next(err);
  }
};

// GET UPCOMING MATCHES
const getUpcomingMatches = async (req, res, next) => {
  try {
    const matches = await Match.findAll({
      where: {
        match_date: { [Op.gte]: new Date() },
      },
      include: [
        { model: Team, as: "homeTeam", attributes: ["id", "name"] },
        { model: Team, as: "awayTeam", attributes: ["id", "name"] },
      ],
      order: [["match_date", "ASC"]],
    });

    res.json(matches);
  } catch (err) {
    next(err);
  }
};

// GET MATCH BY ID
const getMatchById = async (req, res, next) => {
  try {
    const match = await Match.findByPk(req.params.id, {
      include: [
        { model: Team, as: "homeTeam", attributes: ["id", "name"] },
        { model: Team, as: "awayTeam", attributes: ["id", "name"] },
      ],
    });

    if (!match) {
      const error = new Error("Match not found");
      error.statusCode = 404;
      throw error;
    }

    res.json(match);
  } catch (err) {
    next(err);
  }
};

// CREATE MATCH
const createMatch = async (req, res, next) => {
  try {
    const newMatch = await Match.create(req.body);
    res.status(201).json(newMatch);
  } catch (err) {
    next(err);
  }
};

// UPDATE MATCH
const updateMatch = async (req, res, next) => {
  try {
    const match = await Match.findByPk(req.params.id);

    if (!match) {
      const error = new Error("Match not found");
      error.statusCode = 404;
      throw error;
    }

    await match.update(req.body);

    res.json({ message: "Match updated successfully", match });
  } catch (err) {
    next(err);
  }
};

// DELETE MATCH
const deleteMatch = async (req, res, next) => {
  try {
    const match = await Match.findByPk(req.params.id);

    if (!match) {
      const error = new Error("Match not found");
      error.statusCode = 404;
      throw error;
    }

    await match.destroy();

    res.json({ message: "Match deleted successfully" });
  } catch (err) {
    next(err);
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
