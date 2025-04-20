const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Company = sequelize.define(
  "Company",
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
    companyName: { type: DataTypes.STRING, allowNull: false },
    interviewerName: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone: { type: DataTypes.BIGINT, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    yearEst: { type: DataTypes.INTEGER, allowNull: false },
    website: { type: DataTypes.STRING, allowNull: false },
    pincode: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true, // Store the created and updated timestamps
    tableName: "company",
  }
);

module.exports = Company;
