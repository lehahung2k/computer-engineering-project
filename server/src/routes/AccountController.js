const express = require("express");
const router = express.Router();
const { Accounts } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddlewares");

router.post("/", async (req, res) => {
  const {
    username,
    password,
    fullName,
    active,
    role,
    companyName,
    phoneNumber,
    tenantCode,
    email,
  } = req.body;
  const user = await Accounts.findOne({
    where: {
      username: username,
    },
  });
  if (user === null || !user) {
    bcrypt.hash(password, 6).then((hash) => {
      Accounts.create({
        username: username,
        passwd: hash,
        fullName: fullName,
        active: active,
        role: role,
        companyName: companyName,
        phoneNumber: phoneNumber,
        tenantCode: tenantCode,
        email: email,
      });
      res.json("SUCCESS");
    });
  } else {
    res.json({ error: "Error: Username is existed!" });
  }
});

router.post("/login", async (req, res) => {
  const { username, passwd } = req.body;
  const user = await Account.findOne({
    where: {
      username: username,
    },
  });

  if (user === null || !user) {
    res.json({ error: "User not found!" });
  } else {
    bcrypt.compare(passwd, user.passwd).then(async (match) => {
      if (!match) {
        res.json({ error: "Wrong username or password" });
      } else {
        let secretKey = process.env.SECRET_KEY;
        let algorithm = process.env.ALGORITHM;
        const accessToken = sign({ username: user.username }, secretKey, {
          algorithm: algorithm,
        });
        res.json({ accessToken: accessToken, userRole: user.role });
      }
    });
  }
});

router.get("/auth", validateToken, (req, res) => {
  const role = req.user.role;
  res.json(req.user);
});

router.post("/tenant-account", async (req, res) => {
  const { tenantCode } = req.body;
  const account = await Accounts.findOne({
    where: {
      tenantCode: tenantCode,
      role: "tenant",
    },
  });
  res.json({ username: account.username });
});

module.exports = router;
