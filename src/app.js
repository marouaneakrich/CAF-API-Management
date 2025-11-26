const express = require("express");
const app = express();
app.use(express.json());

const sequelize = require("./config/database");
const matchRoutes = require("./routes/matchesRoutes");

app.use("/api/matches", matchRoutes);


sequelize
  .sync({ force: false })
  .then(() => console.log("All tables synced!"))
  .then(() =>
    app.listen(5000, () => console.log("Server running on port 5000"))
  )
  .catch((err) => console.log("Error syncing DB:", err));
