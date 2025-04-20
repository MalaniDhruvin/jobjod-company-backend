const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Assuming you have a sequelize instance setup
const CompanyLogin = require("./loginModel");

// Define the Legal model
const Legal = sequelize.define(
  "Legal",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Path where the file is stored (e.g., local file path or cloud storage URL)
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // MIME type of the file
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Size of the file (optional)
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Store the created and updated timestamps
    tableName: "legals",
  }
); 
// Sync Login table first
CompanyLogin.sync().then(() => {
  // Then sync the table
  Legal.sync();
});

module.exports = Legal;
