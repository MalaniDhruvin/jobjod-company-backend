const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Job = sequelize.define("Job", {
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
  jobTitle: { type: DataTypes.STRING, allowNull: false },
  interviewPersonName: { type: DataTypes.STRING, allowNull: false },
  industry: { type: DataTypes.STRING, unique: true, allowNull: false },
  department: { type: DataTypes.STRING, allowNull: false },
  expiryTime: { type: DataTypes.INTEGER, allowNull: false },
  joiningDate: { type: DataTypes.DATEONLY, allowNull: false },
  salary: { type: DataTypes.STRING, allowNull: false },
  noticePeriod: { type: DataTypes.STRING, allowNull: false },
  responsibility: { type: DataTypes.STRING, allowNull: false },
  qualification: { type: DataTypes.STRING, allowNull: false },
  skills: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Job;
