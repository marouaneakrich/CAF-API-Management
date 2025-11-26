const { Team, Player } = require("../models");
exports.getAllTeams = async (req, res) => {
  try {
    // console.log('getAllTeams called');
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // console.log('About to query database...');
    
    const { count, rows } = await Team.findAndCountAll({
      limit,
      offset,
      attributes: ["id", "name", "country", "flag_url", "coach", "group"],
    });

    // console.log('Database query successful');

    res.status(200).json({
      success: true,
      message: "Teams retrieved successfully",
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    // console.log('ERROR CAUGHT:', error.message);
    // console.log('Full error:', error);
    
    res.status(500).json({
      success: false,
      message: "Error retrieving teams",
      error: error.message,
    });
  }
};
// Get team by ID with associated players
exports.getTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findByPk(id, {
      include: [
        {
          model: Player,
          as: 'players', 
          attributes: ["id", "name", "position", "number", "age"],
        },
      ],
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team retrieved successfully",
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving team",
      error: error.message,
    });
  }
};

//  Create team (admin only)
exports.createTeam = async (req, res) => {
  try {
    const { name, country, flag_url, coach, group } = req.body;

    const newTeam = await Team.create({
      name,
      country,
      flag_url,
      coach,
      group,
    });

    res.status(201).json({
      success: true,
      message: "Team created successfully",
      data: newTeam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating team",
      error: error.message,
    });
  }
};

//  Update team (admin only)
exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, country, flag_url, coach, group } = req.body;

    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    await team.update({
      name: name || team.name,
      country: country || team.country,
      flag_url: flag_url || team.flag_url,
      coach: coach || team.coach,
      group: group || team.group,
    });

    res.status(200).json({
      success: true,
      message: "Team updated successfully",
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating team",
      error: error.message,
    });
  }
};

//  Delete team (admin only)
exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    await team.destroy();

    res.status(200).json({
      success: true,
      message: "Team deleted successfully",
      data: { id: team.id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting team",
      error: error.message,
    });
  }
};
