const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const tokenWithBearer = req.header("Authorization");

  if (!tokenWithBearer) {
    return res.status(401).json({ error: "Unauthorized access!" });
  }

  const token = tokenWithBearer.replace("Bearer ", "");

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DDTOKEN: ", decodedToken);

    req.body.user_id = decodedToken.user_id;

    console.log("BODY: ", req.body.user_id);

    next();
  } catch (error) {
    console.error(error);

    res.status(401).json({ error: "Geçersiz token!" });
  }
};

module.exports = { verifyToken };
