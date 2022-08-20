const express = require('express');
const router = express.Router();
const { EventsMng } = require("../models")

router.get("/", async (req, res) => {
    const listEvents = await EventsMng.findAll();
    res.json(listEvents);
});

router.get("/find-event-by-id/:event_id", async (req, res) => {
    const event_id = req.params.event_id;
    const event = await EventsMng.findByPk(event_id);
    res.json(event);
})

router.post("/add-event", async (req, res) => {
    const post = req.body;
    await EventsMng.create(post);
    res.json(post);
});

module.exports = router;