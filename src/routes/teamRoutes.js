const express = require("express");
const router = express.Router(); //create router object
const { authentication } = require("../middlewares/authMiddleware");
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
router.post("/", authentication, createTeam);
router.put("/:id", authentication, updateTeam);
router.delete("/:id", authentication, deleteTeam);

module.exports = router;
