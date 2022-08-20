const express = require('express');
const router = express.Router();
const {ClientInfo} = require("../models");


router.get("/", async (req, res) => {
    const listClients = await ClientInfo.findAll();
    res.json(listClients);
})

router.post("/add-client", async (req, res) => {
    const post = req.body;
    await ClientInfo.create(post);
    res.json(post);
})

module.exports = router;