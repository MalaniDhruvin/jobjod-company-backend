const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // 1) Grab the token string
  const raw = req.header("Authorization")?.replace(/^Bearer\s+/i, "");
  if (!raw) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }
  console.log("Token received:", raw);

  // 2) Try to decode WITHOUT verifying, so we can inspect userType
  let unsafePayload;
  try {
    unsafePayload = jwt.decode(raw);
  } catch (err) {
    // If decode itself is totally invalid, treat as no token
    return res.status(400).json({ message: "Malformed token" });
  }

  const isSuperAdmin = unsafePayload?.userType === "Super Admin";

  // 3) If not a super-admin, enforce full verification
  if (!isSuperAdmin) {
    try {
      const verified = jwt.verify(raw, process.env.JWT_SECRET);
      req.userId = verified.userId;
      return next();
    } catch (err) {
      console.error("JWT verification failed:", err.message);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  }

  // 4) If super-admin, skip signature check and attach userId
  console.warn("Bypassing token verification for super-admin");
  req.userId   = unsafePayload.userId;
  req.userType = unsafePayload.userType;
  next();
};

module.exports = authenticateToken;
