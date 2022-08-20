const express = require('express');
const router = express.Router();
const { PointCheckin } = require("../models")

router.post("/", async (req, res) => {
    const id = req.body.id;
    console.log(id);
    const listPointOfCheck = await PointCheckin.findAll({
        where: {event_id: id}
    });
    res.json(listPointOfCheck);
});

router.post("/add-point", async (req, res) => {
    const post = req.body;
    await PointCheckin.create(post);
    res.json(post);
});

module.exports = router;