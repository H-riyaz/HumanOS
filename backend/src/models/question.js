const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Question', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    sessionId: { type: DataTypes.UUID, allowNull: false },
    domain: { type: DataTypes.STRING },
    difficulty: { type: DataTypes.INTEGER },
    prompt: { type: DataTypes.TEXT },
    choices: { type: DataTypes.JSON },
    meta: { type: DataTypes.JSON }
  });
};