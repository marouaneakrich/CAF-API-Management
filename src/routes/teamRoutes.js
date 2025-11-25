const express = require('express');
const router = express.Router(); //create router object
//import controller 
const { getAllTeams, getTeamById, createTeam, updateTeam, deleteTeam} = require ('../controllers/teamController');

