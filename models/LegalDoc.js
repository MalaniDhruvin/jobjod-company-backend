// models/LegalDoc.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Your database config

const LegalDocument = sequelize.define(
  "LegalDocument",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    documentType: {
      type: DataTypes.STRING, // Example enum values
      allowNull: false,
    },
    documentNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "legal_docs",
    timestamps: true,
  }
);

module.exports = LegalDocument;
