const express = require("express");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const playerRoutes = require ("./routes/playerRoutes");
const { sequelize } = require('./models');
// Sync database (create tables automatically)
sequelize.sync()
  .then(() => console.log('Database synced!'))
  .catch(err => console.log('Database sync error:', err));


const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
