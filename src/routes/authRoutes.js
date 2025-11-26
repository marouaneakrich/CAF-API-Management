const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.json({ message: "Register route - coming soon" });
});

router.post("/login", (req, res) => {
  res.json({ message: "Login route - coming soon" });
});

module.exports = router;