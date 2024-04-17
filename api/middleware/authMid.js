const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const tokenWithBearer = req.header("Authorization");

  if (!tokenWithBearer) {
    return res.status(401).json({ error: "Unauthorized access!" });
  }

  const token = tokenWithBearer.replace("Bearer ", "");

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.body.user_id = decodedToken.user_id;

    next();
  } catch (error) {
    console.error(error);

    res.status(401).json({ error: "Geçersiz token!" });
  }
};

module.exports = { verifyToken };
