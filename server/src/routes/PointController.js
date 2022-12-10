const express = require("express");
const router = express.Router();
const { PointOfCheckins } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

router.get("/:event_id", async (req, res) => {
  const id = req.params.event_id;
  console.log(id);
  const listPointOfCheck = await PointOfCheckins.findAll({
    where: { event_id: id },
  });
  res.json(listPointOfCheck);
});

router.post(
  "/add-point",
  // validateToken,
  async (req, res) => {
    const post = req.body;
    await PointOfCheckins.bulkCreate(post);
    res.json(post);
  }
);

router.put("/:event_id/update-point/:point_id", async (req, res) => {
  try {
    const event_id = req.params.event_id;
    const point_id = req.params.point_id;
    await PointOfCheckins.update(req.body, {
      where: {
        event_id: event_id,
        point_id: point_id,
      },
    });
    res.json("Update success!");
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/:event_id/delete-point/:point_id", async (req, res) => {
  const event_id = req.params.event_id;
  const point_id = req.params.point_id;
  await PointOfCheckins.destroy({
    where: {
      event_id: event_id,
      point_id: point_id,
    },
  });
  res.json("Delete success");
});

router.delete("/delete-all-poc/:event_id", validateToken, async (req, res) => {
  const event_id = req.params.event_id;
  await PointOfCheckins.destroy({
    where: {
      event_id: event_id,
    },
  });

  res.json("Delete success");
});

router.post(
  "/get-all-poc-by-event-code",
  // validateToken,
  async (req, res) => {
    const eventCode = req.body.eventCode;
    console.log(req.body);
    if (!eventCode) return res.sendStatus(400);
    try {
      const listPoc = await PointOfCheckins.findAll({
        where: { eventCode: eventCode },
        attributes: ["pointName", "username", "pointNote"],
      });
      return res.json(listPoc);
    } catch (err) {
      res.sendStatus(500);
    }
  }
);

module.exports = router;
