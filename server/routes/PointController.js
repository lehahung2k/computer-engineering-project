const express = require('express');
const router = express.Router();
const { PointCheckin } = require("../models")

router.get("/", async (req, res) => {
    const listPointOfCheck = await PointCheckin.findAll();
    res.json(listPointOfCheck);
});

router.post("/add-point", async (req, res) => {
    const post = req.body;
    await PointCheckin.create(post);
    res.json(post);
});

module.exports = router;