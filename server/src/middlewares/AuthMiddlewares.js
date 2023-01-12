const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const userToken = req.header("Authorization");

  if (!userToken) return res.json({ error: "You must login" });
  console.log(userToken);
  try {
    const token = userToken.split(" ")[1];
    const validToken = verify(token, process.env.SECRET_KEY);
    req.user = validToken;
    if (!req.user || !req.user.username || !req.user.userRole) {
      return res.status(401).send("Invalid token");
    }
    console.log(req.user);
    // if (validToken) {
    return next();
    // }
  } catch (err) {
    // return res.json({ error: err });
    return res.status(401).send("Invalid token");
  }
};
module.exports = { validateToken };
