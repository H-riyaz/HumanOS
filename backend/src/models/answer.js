const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Answer', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    sessionId: { type: DataTypes.UUID, allowNull: false },
    questionId: { type: DataTypes.UUID, allowNull: false },
    answer: { type: DataTypes.TEXT },
    meta: { type: DataTypes.JSON },
    performance: { type: DataTypes.JSON }
  });
};