const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PersonalDetails = sequelize.define("PersonalDetails", {
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
  minAgeRequired: { type: DataTypes.INTEGER, allowNull: false },
  preferredLanguage: { type: DataTypes.JSON, allowNull: false },
  assets: { type: DataTypes.JSON, allowNull: false },
  degreeAndSpecialization: { type: DataTypes.JSON, allowNull: false },
  certification: { type: DataTypes.JSON, allowNull: false },
  preferredIndustry: { type: DataTypes.JSON, allowNull: false },
  securityDepositRequired: { type: DataTypes.BOOLEAN, allowNull: false },
},
{
  timestamps: true, // Store the created and updated timestamps
  tableName: "personaldetails",
});

module.exports = { PersonalDetails };
