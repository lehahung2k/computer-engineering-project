const express = require('express');
const router = express.Router();
const { PointCheckin } = require("../models")
const {validateToken} = require('../middlewares/AuthMiddlewares');

router.get("/:event_id", async (req, res) => {
    const id = req.params.event_id;
    console.log(id);
    const listPointOfCheck = await PointCheckin.findAll({
        where: {event_id: id}
    });
    res.json(listPointOfCheck);
});

router.post("/add-point", validateToken, async (req, res) => {
    const post = req.body;
    await PointCheckin.create(post);
    res.json(post);
});

module.exports = router;