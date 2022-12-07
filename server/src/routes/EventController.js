const express = require("express");
const router = express.Router();
const { EventsMng, PointOfCheckins } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");
const { authPermission } = require("../middlewares/AuthPermission");

router.get("/", async (req, res) => {
  const listEvents = await EventsMng.findAll();
  res.json(listEvents);
});

router.get(
  "/find-event-by-id/:event_id", //authPermission([1]),
  validateToken,
  async (req, res) => {
    const event_id = req.params.event_id;
    const event = await EventsMng.findByPk(event_id);
    res.json(event);
  }
);

router.get("/find-event-by-code/:event_code", async (req, res) => {
  const event_code = req.params.event_code;
  const listEvents = await EventsMng.findAll({
    where: { event_code: event_code },
  });
  res.json(listEvents);
});

router.post(
  "/add-event",
  // validateToken,
  async (req, res) => {
    const post = req.body;
    try {
      await EventsMng.create(post);
      res.json(req.body);
    } catch (err) {
      res.json(req.body);
    }
  }
);

router.put(
  "/update-event/:event_id",
  // validateToken,
  async (req, res) => {
    const event_id = req.params.event_id;
    await EventsMng.update(req.body, {
      where: { event_id: event_id },
    });
    res.json("Update success!");
  }
);

router.delete(
  "/delete-event-by-id/:event_id",
  validateToken,
  async (req, res) => {
    const event_id = req.params.event_id;
    await EventsMng.destroy({
      where: { event_id: event_id },
    });
    res.json("Delete success");
  }
);

router.post("/list-event-by-account", async (req, res) => {
  const username = req.body.username;
  if (!username) {
    return res.sendStatus(400);
  }
  try {
    let listEventCode = await PointOfCheckins.findAll({
      where: { username: username },
      attributes: ["eventCode"],
    });
    let listEvent = [];
    for (let eventCode of listEventCode) {
      let event = await EventsMng.findOne({
        where: { eventCode: eventCode.dataValues.eventCode },
      });
      listEvent.push(event);
    }
    res.json(listEvent);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;
