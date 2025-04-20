const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const JobBasicInfo = sequelize.define(
  "JobBasicInfo",
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
    jobTitle: { type: DataTypes.JSON, allowNull: false },
    interviewPersons: {
      type: DataTypes.JSON, // Supports multiple interview persons
      allowNull: false,
    },
    industry: { type: DataTypes.JSON, allowNull: false },
    jobRole: { type: DataTypes.STRING, allowNull: false },
    expiryTime: { type: DataTypes.INTEGER, allowNull: false },
    joiningDate: { type: DataTypes.DATE, allowNull: false },
    minSalary: { type: DataTypes.FLOAT, allowNull: false },
    maxSalary: { type: DataTypes.FLOAT, allowNull: false },
    noOfOpenings: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true, // Store the created and updated timestamps
    tableName: "basicinfo",
  }
);


module.exports = { JobBasicInfo };
