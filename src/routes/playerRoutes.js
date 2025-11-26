const express = require("express");
const router = express.Router();

const {
  getAllPlayers,
  getPlayersByTeam,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
}= require ("../controllers/playerController");
const authMiddleware = require ("../middlewares/authMiddleware")

//public routes
router.get("/" , getAllPlayers);
router.get("/teams/:teamId" , getPlayersByTeam);
router.get("/:id", getPlayerById);

//protrected routes for admin only
 router.post("/", authMiddleware, createPlayer);
 router.put("/:id" , authMiddleware, updatePlayer);
 router.delete("/:id", authMiddleware , deletePlayer);

 module.exports = router;