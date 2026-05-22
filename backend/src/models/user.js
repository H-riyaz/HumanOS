const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    passwordHash: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
    education: { type: DataTypes.STRING },
    language: { type: DataTypes.STRING },
    careerInterest: { type: DataTypes.STRING },
    psychBackground: { type: DataTypes.TEXT },
    consentGiven: { type: DataTypes.BOOLEAN, defaultValue: false },
    role: { type: DataTypes.STRING, defaultValue: 'user' }
  });
};
