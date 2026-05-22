const { Sequelize } = require('sequelize');
const UserModel = require('./user');

let sequelize;
let models = {};

async function initDb() {
  const DATABASE_URL = process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/humanos';
  sequelize = new Sequelize(DATABASE_URL, { logging: false });

  // Init models
  const User = UserModel(sequelize);

  models = { User };

  await sequelize.sync({ alter: false });
  return { sequelize, models };
}

function getModels() {
  if (!models || !models.User) throw new Error('Models not initialized. Call initDb first.');
  return models;
}

module.exports = { initDb, getModels, sequelize };
