const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const userToken = req.header("authorization");

  if (!userToken) return res.json({ error: "You must login" });

  try {
    const token = userToken.split(" ")[1];
    const validToken = verify(token, process.env.SECRET_KEY);
    req.user = validToken;
    // if (validToken) {
    return next();
    // }
  } catch (err) {
    // return res.json({ error: err });
    return res.status(401).send("Invalid token");
  }
};
module.exports = { validateToken };
