const jwt = require("jsonwebtoken");

module.exports = (roles) => {
  return (req, res, next) => {
    try {
      // Get token from header
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
      }

      // Remove "Bearer " if present
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      // Verify token
      const decoded = jwt.verify(token, "secretkey");

      // Role check
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Access denied" });
      }

      // Attach user info (optional)
      req.user = decoded;

      next();

    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
};