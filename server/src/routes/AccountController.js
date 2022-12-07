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
  try {
    const account = await Accounts.findAll({
      where: {
        tenantCode: tenantCode,
        role: "tenant",
      },
    });
    res.json({ username: account.username });
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

router.post("/poc-account", async (req, res) => {
  const { tenantCode } = req.body;
  console.log(tenantCode);
  try {
    const account = !tenantCode
      ? await Accounts.findAll({
          where: {
            role: "poc",
          },
        })
      : await Accounts.findAll({
          where: {
            tenantCode: tenantCode,
            role: "poc",
          },
        });
    const listUsername = account.map((account) => ({
      username: account.username,
      fullName: account.fullName,
      phoneNumber: account.phoneNumber,
      companyName: account.companyName,
    }));
    res.json(listUsername);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

router.put("/update-account", async (req, res) => {
  const username = req.body.username;
  if (!username) return res.sendStatus(400);
  try {
    await Accounts.update(
      { active: 1 },
      {
        where: { username: username },
      }
    );
    res.json({ message: "Update success" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
