const CompanyLogin = require("../models/loginModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create a new login or register
exports.createLogin = async (req, res) => {
  const { mobileNumber, otp } = req.body; // Get mobileNumber and OTP from the request

  try {
    // Check if mobile number already exists in the database
    let login = await CompanyLogin.findOne({ where: { mobileNumber } });

    // If the login exists and OTP matches
    if (login && otp === process.env.OTP) {
      const token = jwt.sign({ loginId: login.id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      return res.status(200).json({
        login,
        message: "login", // Return a 'login' message
        token,
      });
    }

    // If login doesn't exist or OTP doesn't match, create a new entry
    if (!login) {
      login = await CompanyLogin.create({ mobileNumber });
      if (login && otp === process.env.OTP) {
        const token = jwt.sign({ loginId: login.id }, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        return res.status(200).json({
          login,
          message: "register", // Return a 'register' message
          token,
        });
      }
    }

    // If OTP is incorrect, return an error
    return res.status(400).json({ message: "Invalid OTP" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
