const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CompanyOverview = sequelize.define(
  "CompanyOverview",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
    companyIndustry: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    overview: { type: DataTypes.TEXT, allowNull: true },
    vision: { type: DataTypes.TEXT, allowNull: true },
    mission: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    timestamps: true, // Store the created and updated timestamps
    tableName: "overview",
  }
);

module.exports = CompanyOverview;
