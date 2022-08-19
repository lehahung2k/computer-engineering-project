const express = require('express');
const router = express.Router();
const { EventsMng } = require("../models")

router.get("/", async (req, res) => {
    const listEvents = await EventsMng.findAll();
    res.json(listEvents);
});

router.post("/add-event", async (req, res) => {
    const post = req.body;
    await EventsMng.create(post);
    res.json(post);
});

module.exports = router;