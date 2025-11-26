const express = require("express");
const router = express.Router(); //create router object
//import controller
const {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");
router.get("/", getAllTeams);
router.get("/:id", getTeamById);
router.post("/", createTeam);
router.put("/:id", updateTeam);
router.delete("/:id",  deleteTeam);

module.exports = router;
