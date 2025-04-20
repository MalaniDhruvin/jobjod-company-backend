const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CandidateRequirement = sequelize.define(
  "CandidateRequirement",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Login", // The target model is 'Companies'
        key: "id",
      },
      onDelete: "CASCADE", // Adjust based on your requirements
      onUpdate: "CASCADE", // Adjust based on your requirements
    },
    totalExperience: { type: DataTypes.STRING, allowNull: false },
    minExperience: { type: DataTypes.STRING, allowNull: false },
    maxExperience: { type: DataTypes.STRING, allowNull: false },
    minimumQualification: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    englishRequirement: { type: DataTypes.STRING, allowNull: false },
    candidateLocations: { type: DataTypes.JSON, allowNull: false },
    acceptNearbyRelocation: { type: DataTypes.BOOLEAN, allowNull: false },
    offerBonus: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    timestamps: true, // Store the created and updated timestamps
    tableName: "candidaterequirement",
  }
);

module.exports = { CandidateRequirement };
