const { Team, Player } = require('../models');
//get all teams
exports.getAllTeams = async (req, res) => {
  try {
     const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
     const { count, rows } = await Team.findAndCountAll({
      limit,
      offset,
      attributes: ['id', 'name', 'country', 'flag_url', 'coach', 'group'],
       });

    res.status(200).json({
      success: true,
      message: 'Teams retrieved successfully',
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving teams',
      error: error.message
    });
  }
};