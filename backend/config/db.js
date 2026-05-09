const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("DATABASE_URL =", process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: console.log,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ FULL DATABASE ERROR:");
    console.error(error);
  }
})();

module.exports = sequelize;