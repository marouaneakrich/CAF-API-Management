const express = require("express");
const app = express();
require("dotenv").config();

// Middleware
app.use(express.json());

// Database
const sequelize = require("./config/database");

// Routes
const matchRoutes = require("./routes/matchRoutes");
app.use("/api/matches", matchRoutes);

// Error Handler
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

// Start Server & Connect to DB
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    await sequelize.sync({ force: false });
    console.log("All tables synced!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();

module.exports = app;
