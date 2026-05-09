const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");
require("./models");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

sequelize.authenticate()
  .then(() => {
    console.log("Database connected");

    return sequelize.sync();
  })
  .then(() => {
    console.log("Database synced");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Startup Error:", err);
  });