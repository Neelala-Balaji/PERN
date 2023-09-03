const jwt = require("jsonwebtoken");
const jwtConfig = require("./jwtconfig"); // Import your JWT configuration

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  // Example of verifying a JWT token
  try {
    jwt.verify(token, jwtConfig.secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden (invalid token)
      }
      req.user = user; // You can access the user information in your routes
      next(); // Continue processing the request
    });
  } catch (error) {
    // Token is invalid or has expired
    console.error("JWT verification failed:", error);
  }

  // jwt.verify(token, jwtConfig.secretKey, (err, user) => {
  //   if (err) {
  //     return res.sendStatus(403); // Forbidden (invalid token)
  //   }
  //   req.user = user; // You can access the user information in your routes
  //   next(); // Continue processing the request
  // });
}

module.exports = authenticateToken;
