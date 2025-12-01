const express = require("express");
const router = express.Router(); //create router object
const authMiddleware = require("../middlewares/authMiddleware")
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
router.post("/", authMiddleware, createTeam);           
router.put("/:id", authMiddleware, updateTeam);         
router.delete("/:id", authMiddleware, deleteTeam);      

module.exports = router;
