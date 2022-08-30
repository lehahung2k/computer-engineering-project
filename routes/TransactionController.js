const express = require('express');
const router = express.Router();
const {Transactions} = require("../models");
const {validateToken} = require('../middlewares/AuthMiddlewares');

router.get("/:event_id", async (req, res) => {
    const event_id = req.params.event_id;
    const listTransactions = await Transactions.findAll({
        where: {event_id: event_id},
    })

    res.json(listTransactions);
})

router.post("/add-transaction", async (req, res) => {
    const post = req.body;
    await Transactions.create(post);
    res.json(post);
})

router.delete("/delete-transaction/:event_id", async (req, res) => {
    const event_id = req.params.event_id;
    await Transactions.destroy({
        where:{
            event_id: event_id
        }
    })

    res.json("Delete success");
})

module.exports = router;