const express = require('express');
const router = express.Router();
const { Users } = require("../models")
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/AuthMiddlewares');

router.post("/", async (req, res) => {
    const { username, passwd, full_name, active, role, companyName, phoneNumber } = req.body;
    const user = await Users.findOne({
        where: {
            username: username
        }
    });
    if (user === null || !user) {
        bcrypt.hash(passwd, 6).then((hash) => {
            Users.create({
                username: username,
                passwd: hash,
                full_name: full_name,
                active: active,
                role: role,
                companyName: companyName,
                phoneNumber: phoneNumber
            });
            res.json("SUCCESS");
        });
    } else {
        res.json({error: "Error: Username is existed!"});
    }

})

router.post("/login", async (req, res) => {
    const { username, passwd } = req.body;
    const user = await Users.findOne({
        where: {
            username: username
        }
    });

    if (user === null || !user) {
        res.json({ error: "User not found!" });
    } else {
        bcrypt.compare(passwd, user.passwd).then(async (match) => {
            if (!match) {
                res.json({ error: "Wrong username or password" });
            } else {
                const accessToken = sign(
                    { username: user.username, user_id: user.user_id },
                    "importantsecret"
                );
                res.json(accessToken);
            }
        });
    }
})

router.get("/auth", validateToken, (req, res) => {
    const role = req.user.role;
    res.json(req.user);
});

module.exports = router;