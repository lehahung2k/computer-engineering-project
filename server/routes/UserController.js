const express = require('express');
const router = express.Router();
const { Users } = require("../models")
const bcrypt = require('bcrypt');

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

module.exports = router;