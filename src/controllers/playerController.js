const { Player, Team } = require("../models");

//get all players
exports.getAllPlayers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; //def page
    const limit = parseInt(req.query.limit) || 10; //max 10 per page
    const offset = (page - 1) * limit; //skip .... offset formula
    const { count, rows } = await Player.findAndCountAll({
      limit,
      offset,
      attributes: ["id", "name", "position", "number", "age", "team_id"],
      include: [
        {
          model: Team,
          as: "team",
          attributes: ["id", "name", "country"],
        },
      ],
    });
    res.status(200).json({
      success: true,
      message: "Players retrieved successfully",
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit), // Calculating the number of pages
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving players",
      error: error.message,
    });
  }
};

//get players by team
exports.getPlayersByTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    //check if team exist
    const team = await Team.findByPk(teamId);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team Not Found",
      });
    }
    //get players for this team
    const { count, rows } = await Player.findAndCountAll({
      where: { team_id: teamId },
      limit,
      offset,
      attributes: ["id", "name", "position", "number", "age"],
      include: [
        {
          model: Team,
          as: "team",
          attributes: ["id", "name", "country"],
        },
      ],
    });
    res.status(200).json({
      success: true,
      message: `Players from $(team.name) retrieved successfully`,
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving team players",
      error: error.message,
    });
  }
};
//  Get player by ID
exports.getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;

    const player = await Player.findByPk(id, {
      attributes: ["id", "name", "position", "number", "age", "team_id"],
      include: [
        {
          model: Team,
          as: "team",
          attributes: ["id", "name", "country", "coach", "group"],
        },
      ],
    });

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Player retrieved successfully",
      data: player,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving player",
      error: error.message,
    });
  }
};

//  Create player (admin only)
exports.createPlayer = async (req, res) => {
  try {
    const { name, position, number, age, team_id } = req.body;

    const newPlayer = await Player.create({
      name,
      position,
      number,
      age,
      team_id,
    });

    res.status(201).json({
      success: true,
      message: "Player created successfully",
      data: newPlayer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating player",
      error: error.message,
    });
  }
};
//   Update player (admin only)
exports.updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, number, age, team_id } = req.body;

    const player = await Player.findByPk(id);

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    await player.update({
      name: name || player.name,
      position: position || player.position,
      number: number || player.number,
      age: age || player.age,
      team_id: team_id || player.team_id,
    });

    res.status(200).json({
      success: true,
      message: "Player updated successfully",
      data: player,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating player",
      error: error.message,
    });
  }
};

//  Delete player (admin only)
exports.deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const player = await Player.findByPk(id);

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    await player.destroy();

    res.status(200).json({
      success: true,
      message: "Player deleted successfully",
      data: { id: player.id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting player",
      error: error.message,
    });
  }
};
