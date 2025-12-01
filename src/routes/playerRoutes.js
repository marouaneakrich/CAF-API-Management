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
const { authentication } = require ("../middlewares/authMiddleware")

//public routes
router.get("/" , getAllPlayers);
router.get("/teams/:teamId" , getPlayersByTeam);
router.get("/:id", getPlayerById);

//protrected routes for admin only
 router.post("/", authentication, createPlayer);
 router.put("/:id" , authentication, updatePlayer);
 router.delete("/:id", authentication , deletePlayer);

 module.exports = router;