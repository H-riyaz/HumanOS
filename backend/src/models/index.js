const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const SessionModel = require('./session');
const QuestionModel = require('./question');
const AnswerModel = require('./answer');

let sequelize;
let models = {};

async function initDb() {
  const DATABASE_URL = process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/humanos';
  sequelize = new Sequelize(DATABASE_URL, { logging: false });

  // Init models
  models.User = UserModel(sequelize);
  models.Session = SessionModel(sequelize);
  models.Question = QuestionModel(sequelize);
  models.Answer = AnswerModel(sequelize);

  // Associations
  models.User.hasMany(models.Session, { foreignKey: 'userId' });
  models.Session.belongsTo(models.User, { foreignKey: 'userId' });
  models.Session.hasMany(models.Question, { foreignKey: 'sessionId' });
  models.Question.belongsTo(models.Session, { foreignKey: 'sessionId' });
  models.Question.hasMany(models.Answer, { foreignKey: 'questionId' });
  models.Answer.belongsTo(models.Question, { foreignKey: 'questionId' });

  await sequelize.sync({ alter: false });
  return { sequelize, models };
}

function getModels() {
  if (!models || !models.User) throw new Error('Models not initialized. Call initDb first.');
  return models;
}

module.exports = { initDb, getModels, sequelize };
