const express = require("express");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const { sequelize } = require('./models');
// Sync database (create tables automatically)
sequelize.sync()
  .then(() => console.log('Database synced!'))
  .catch(err => console.log('Database sync error:', err));


const app = express();

app.use(express.json());

app.use("/api/teams", teamRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
zo