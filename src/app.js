const express = require("express");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const playerRoutes = require ("./routes/playerRoutes");
const { sequelize } = require('./models');
const cors = require('cors');
require('dotenv').config();
// Sync database (create tables automatically)
sequelize.sync()
  .then(() => console.log('Database synced!'))
  .catch(err => console.log('Database sync error:', err));


const app = express();
// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);

// Mount routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
        return sequelize.sync(); // Creates tables if they don't exist
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });

















