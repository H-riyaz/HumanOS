const { Sequelize } = require('sequelize');
const UserModel = require('./user');

let sequelize;

async function initDb() {
  const DATABASE_URL = process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/humanos';
  sequelize = new Sequelize(DATABASE_URL, { logging: false });

  // Init models
  const User = UserModel(sequelize);

  await sequelize.sync({ alter: false });
  return { sequelize, models: { User } };
}

module.exports = { initDb };
