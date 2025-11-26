const express = require("express");
const app = express();
app.use(express.json());

const sequelize = require("./config/database");   // database.js

const matchRoutes = require("./routes/matchesRoutes"); // routes
app.use("/api/matches", matchRoutes);

// Sync database
sequelize.sync({ force: false })
  .then(() => {
    console.log("All tables synced!");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => console.log("Error syncing DB:", err));
