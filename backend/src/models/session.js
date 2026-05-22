const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Session', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    profile: { type: DataTypes.JSON },
    difficulty: { type: DataTypes.INTEGER, defaultValue: 3 },
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
    startedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    lastActive: { type: DataTypes.DATE },
    userId: { type: DataTypes.UUID, allowNull: true }
  });
};