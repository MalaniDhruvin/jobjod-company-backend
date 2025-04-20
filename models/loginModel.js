const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Define User model
const CompanyLogin = sequelize.define(
  "CompanyLogin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mobileNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true, // Store createdAt and updatedAt automatically
    tableName: "companyLogin", // Ensure the table name is correct
  }
);

module.exports = CompanyLogin;
