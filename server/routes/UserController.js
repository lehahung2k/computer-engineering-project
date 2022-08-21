const express = require('express');
const router = express.Router();
const { Users } = require("../models")
const bcrypt = require('bcryptjs');
const {sign} = require('jsonwebtoken');

router.post("/", async (req, res) => {
    const { username, passwd, full_name, active, role } = req.body;
    bcrypt.hash(passwd, 6).then((hash) => {
        Users.create({
            username: username,
            passwd: hash,
            full_name: full_name,
            active: active,
            role: role,
        });
        res.json("SUCCESS");
    });
})

router.post("/login", async (req, res) => {
    const { username, passwd } = req.body;
    const user = await Users.findOne({
        where: {
            username: username
        }
    });

    if (!user) {
        res.json({error: "User not found!"});
    }
    bcrypt.compare(passwd, user.passwd).then(async (match) => {
        if (!match) {
            res.json({error: "Wrong username or password"});
        }
        const accessToken = sign({username: user.username, user_id: user.user_id}, "importantsecret");
        res.json("Login success");
    });
})

module.exports = router;